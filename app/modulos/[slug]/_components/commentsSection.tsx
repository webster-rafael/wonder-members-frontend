"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCommentsData } from "@/hooks/useModulesData";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SendHorizontal, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type CommentWithUser = {
  id: string;
  comment: string;
  created_at: string;
  userId: string;
  user: {
    name: string;
    image: string | null;
  };
};

const createComment = async ({
  comment,
  classId,
}: {
  comment: string;
  classId: string;
}) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/comments`,
    { comment, classId },
    { withCredentials: true },
  );
  return data;
};

const deleteComment = async (commentId: string) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
    withCredentials: true,
    data: { id: commentId },
  });
};

export default function CommentsSection({ classId }: { classId: string }) {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  const { user: currentUser } = useAuthStore();

  const { data: comments, isLoading, isError } = useCommentsData(classId);

  const createMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({ queryKey: ["comments", classId] });
    },
    onError: (error) => {
      console.error("Erro ao criar comentário:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", classId] });
    },
    onError: (error) => {
      console.error("Erro ao apagar o comentário:", error);
    },
  });

  const handleCreateComment = () => {
    if (newComment.trim()) {
      createMutation.mutate({ comment: newComment, classId });
    }
  };

  const handleDeleteComment = (commentId: string) => {
    deleteMutation.mutate(commentId);
  };

  if (isLoading) {
    return <div>Carregando comentários...</div>;
  }

  if (isError) {
    return <div>Ocorreu um erro ao carregar os comentários.</div>;
  }

  return (
    <section>
      <h2 className="mb-4 hidden font-semibold text-zinc-300 lg:block lg:text-xl">
        Comentários
      </h2>

      <div className="flex flex-col rounded-md bg-black">
        <div className="flex flex-col items-center gap-6 p-5 lg:h-28 lg:flex-row">
          <Image
            src={currentUser?.image || "/user.png"}
            className="rounded-full"
            width={70}
            height={70}
            alt="Sua foto de perfil"
          />
          <div className="flex w-full items-center gap-5 rounded-md border border-stone-500 bg-stone-900 p-3 lg:p-5">
            <Input
              className="w-full border-none bg-transparent text-xs focus-visible:ring-0 lg:text-base"
              placeholder="Escreva aqui seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateComment()}
              disabled={createMutation.isPending}
            />
            <Button
              onClick={handleCreateComment}
              disabled={createMutation.isPending}
              className="bg-[var(--vermelho)] hover:bg-red-800"
            >
              {createMutation.isPending ? (
                "Enviando..."
              ) : (
                <SendHorizontal size={15} />
              )}
            </Button>
          </div>
        </div>

        <div className="w-full rounded-b-md bg-stone-900 p-5">
          {comments && comments.length > 0 ? (
            <div className="flex flex-col">
              {comments.map((comment: CommentWithUser, index: number) => (
                <div key={comment.id}>
                  <div className="flex items-start space-x-4 py-6">
                    <Image
                      src={comment.user.image || "/user.png"}
                      alt={`Foto de perfil de ${comment.user.name}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">
                        {comment.user.name}
                      </p>
                      <p className="text-xs whitespace-pre-wrap text-zinc-400">
                        {comment.comment}
                      </p>
                    </div>
                    {currentUser?.id === comment.userId && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={
                          deleteMutation.isPending &&
                          deleteMutation.variables === comment.id
                        }
                        className="text-red-400 hover:bg-red-900/50 hover:text-red-300"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {index < comments.length - 1 && (
                    <Separator className="bg-stone-700" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-40 w-full flex-col items-center justify-center">
              <Image
                src={"/comments-icon.png"}
                width={100}
                height={100}
                alt="Ícone de comentários"
              />
              <h3 className="text-zinc-400">Seja o primeiro a comentar</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
