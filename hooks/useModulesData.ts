import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchModulesData = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/modules`,
    {
      withCredentials: true,
    },
  );
  return data;
};

export function useModulesData() {
  const query = useQuery({
    queryFn: fetchModulesData,
    queryKey: ["modules"],
  });
  return query;
}

const fetchClassesData = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/classes`,
    {
      withCredentials: true,
    },
  );
  return data;
};

export function useClassesData() {
  const query = useQuery({
    queryFn: fetchClassesData,
    queryKey: ["classes"],
  });
  return query;
}

const fetchCommentsByClass = async (classId: string | null) => {
  if (!classId) return [];

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${classId}`,
    {
      withCredentials: true,
    },
  );
  return data;
};

export function useCommentsData(classId: string | null) {
  const query = useQuery({
    queryKey: ["comments", classId],
    queryFn: () => fetchCommentsByClass(classId),
    enabled: !!classId,
  });
  return query;
}
