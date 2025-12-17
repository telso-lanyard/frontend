import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import "./style.scss";
import urls from "../../../../../../../utils/urls";
import * as assets from "../../../../../../../assets";
import Input from "../../../../../../../components/Input";
import api from "../../../../../../../utils/api";
import { models } from "../../../../../../../utils/data";

function Edit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<{
    _id: string;
    name: string;
    type: string;
    media: string[];
  }>({ _id: "", name: "", type: "", media: [] });

  const { data: doc } = useQuery<typeof data, Error>({
    queryKey: ["Post", "Archive", id],
    queryFn: () =>
      api.get(`/archive/${id}`).then((res) => res.data.documents[0]),

    enabled: !!id && id !== "new",
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (doc) setData(doc);
  }, [doc]);

  const createMutation = useMutation({
    mutationFn: () =>
      api
        .post("archive", {
          name: data?.name,
          type: data?.type,
          media: data?.media,
        })
        .then((res) => res.data),

    onSuccess: (data) => {
      navigate(`/admin/archive/${data.id}`);
      toast.success("Created successfully");
    },
  });

  async function post() {
    try {
      if (!data) return toast.error("Please enter valid info");
      if (!data.name) return toast.error("Please enter a valid name");
      if (!data.media) return toast.error("Please enter valid media");

      createMutation.mutate();
    } catch (err) {
      console.log("Validation failed");
    }
  }

  const patchMutation = useMutation({
    mutationFn: (body: Partial<typeof data>) =>
      api.patch(`/archive/${id}`, body).then((res) => res.data),

    onSuccess: () => {
      toast.success("Updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["Post", "Archive"],
      });
    },
  });

  async function update(
    body: Partial<typeof data> = {
      name: data?.name,
      type: data?.type,
      media: data?.media,
    }
  ) {
    try {
      patchMutation.mutate(body);
    } catch (err) {
      console.log("Operation failed");
    }
  }

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/archive/${id}`).then((res) => res.data),

    onSuccess: () => {
      toast.success("Deleted successfully");
      navigate("/admin/archive");
    },
  });

  async function deletePost() {
    try {
      deleteMutation.mutate();
    } catch (err) {
      console.log("Operation failed");
    }
  }

  const uploadMutation = useMutation<
    {
      files: { storedName: string }[];
    },
    Error,
    FormData
  >({
    mutationFn: (formData) =>
      api.post("/media-upload", formData).then((res) => res.data),

    onSuccess: (data) => {
      setData((prev) => ({
        ...prev,
        media: [...prev.media, data.files[0].storedName],
      }));
    },
  });

  async function upload(files: FileList) {
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));

      uploadMutation.mutate(formData);
    } catch (err) {
      console.log("Operation failed");
    }
  }

  return (
    <>
      <div id="admin_edit_wrapper">
        <div>
          <button
            style={{
              marginLeft: id !== "new" ? undefined : "auto",
            }}
            onClick={() => (id !== "new" ? update() : post())}
          >
            {id !== "new" ? "Update" : "Add"}
          </button>
          {id !== "new" && <button onClick={deletePost}>Delete</button>}
        </div>
        <Input
          type="text"
          placeholder="Design name"
          value={data?.name ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData((prev) => {
              if (!prev) return prev;

              return {
                ...prev,
                name: e.target.value,
              };
            })
          }
        />
        <select
          value={data.type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setData((prev) => {
              if (!prev) return prev;

              return {
                ...prev,
                type: e.target.value,
              };
            })
          }
        >
          <option value="" disabled>
            Select phone model
          </option>

          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <section>
          {data.media.map((el, i) => (
            <div>
              <img
                src={assets.delete}
                alt="delete"
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    media: prev.media.filter((_, j) => j !== i),
                  }));
                }}
              />
              <img src={`${urls.media}/${el}`} alt="" key={i} />
            </div>
          ))}
          <img
            src={assets["image_arrow_up"]}
            alt=""
            onClick={() => document.getElementById("file-upload")?.click()}
          />
        </section>
      </div>
      <input
        type="file"
        id="file-upload"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files) {
            upload(e.target.files);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

export default Edit;
