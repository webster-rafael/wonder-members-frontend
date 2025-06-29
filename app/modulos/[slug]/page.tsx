"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  CircleDashed,
  LoaderCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import YoutubeFrame from "../_components/youtubeFrame";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useClassesData } from "@/hooks/useModulesData";
import { Classes } from "@/interface";
import ProtectedRouter from "@/app/_components/protectRouter";
import CommentsSection from "./_components/commentsSection";

type ClassesWithWatched = Classes & { watched: boolean };

const Modulos = () => {
  const { data: classesData, isLoading } = useClassesData();
  const { slug } = useParams();
  const [videoList, setVideoList] = useState<ClassesWithWatched[]>([]);
  const [currentVideo, setCurrentVideo] = useState<ClassesWithWatched | null>(
    null,
  );
  const currentModule = videoList.find((video) => video.moduleId === slug);

  useEffect(() => {
    if (classesData) {
      const watchedIds = JSON.parse(
        localStorage.getItem("watchedVideos") || "[]",
      );
      const filteredBySlug = classesData.filter(
        (classe: Classes) => classe.moduleId === slug,
      );
      const enriched = filteredBySlug.map((video: Classes) => ({
        ...video,
        watched: watchedIds.includes(video.id),
      }));
      setVideoList(enriched);
      setCurrentVideo(enriched[0]);
    }
  }, [classesData, slug]);

  const totalVideos = videoList.length;
  const watchedVideos = videoList.filter((video) => video.watched).length;
  const watchedPercentage = Math.round((watchedVideos / totalVideos) * 100);

  const handleVideoWatched = (videoId: string) => {
    const updatedVideos = videoList.map((video) =>
      video.id === videoId ? { ...video, watched: true } : video,
    );
    setVideoList(updatedVideos);
    setCurrentVideo(updatedVideos.find((video) => video.id === videoId)!);

    const watchedIds = JSON.parse(
      localStorage.getItem("watchedVideos") || "[]",
    );
    if (!watchedIds.includes(videoId)) {
      watchedIds.push(videoId);
      localStorage.setItem("watchedVideos", JSON.stringify(watchedIds));
    }
  };

  const handlePrevious = () => {
    const currentIndex = videoList.findIndex((v) => v.id === currentVideo?.id);
    if (currentIndex > 0) {
      setCurrentVideo(videoList[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = videoList.findIndex((v) => v.id === currentVideo?.id);
    if (currentIndex < videoList.length - 1) {
      setCurrentVideo(videoList[currentIndex + 1]);
    }
  };

  if (isLoading || !currentVideo) {
    return <div className="text-white">Carregando...</div>;
  }

  return (
    <ProtectedRouter>
      <section className="mx-auto w-full max-w-7xl space-y-5 px-5 py-10">
        <h1 className="text-center text-xl text-[var(--vermelho)] lg:text-start lg:text-4xl">
          {currentVideo.title}
        </h1>
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="w-full space-y-2 lg:col-span-2">
            <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="hover:text-zinc-400" href="/">
                      Início
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink className="hover:text-zinc-400" href="/">
                      Módulos
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium text-zinc-300">
                      {isLoading
                        ? "Carregando..."
                        : currentModule?.module.title ||
                          "Módulo não encontrado"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePrevious}
                  className="flex cursor-pointer items-center bg-transparent text-sm text-zinc-300"
                >
                  <ChevronLeft size={14} />
                  Anterior
                </Button>
                <span className="text-[var(--vermelho)]">|</span>
                <Button
                  onClick={handleNext}
                  className="flex cursor-pointer items-center bg-transparent text-sm text-zinc-300"
                >
                  Próximo <ChevronRight size={14} />
                </Button>
              </div>
            </div>
            <div className="mt-10 h-[400px] w-full rounded-md border border-zinc-700 bg-zinc-900">
              <YoutubeFrame videoId={currentVideo.link_url} />
            </div>
          </div>
          <div className="space-y-5">
            <Button
              variant="default"
              className="cursor-pointer border border-zinc-700 bg-transparent"
            >
              <Image
                src={"/icon-modules.PNG"}
                width={13}
                height={12}
                alt="Icone"
              />{" "}
              Ver Módulos
            </Button>
            <div className="flex h-full gap-2">
              <div className="w-full space-y-2">
                <div className="flex items-center gap-5">
                  <div className="relative size-10">
                    <svg
                      className="rotate-[-90deg]"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        stroke="#27272A"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        stroke="var(--vermelho)"
                        strokeWidth="4"
                        strokeDasharray={Math.PI * 2 * 18}
                        strokeDashoffset={
                          Math.PI * 2 * 18 * (1 - watchedPercentage / 100)
                        }
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white">
                      {watchedPercentage}%
                    </div>
                  </div>

                  <h1 className="text-xl font-semibold">
                    {isLoading
                      ? "Carregando..."
                      : currentModule?.module.title || "Módulo não encontrado"}
                  </h1>
                </div>
                {videoList.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setCurrentVideo(video)}
                    className={`ml-5 flex w-full cursor-pointer items-center gap-5 hover:text-[var(--vermelho)] ${
                      currentVideo.id === video.id
                        ? "text-[var(--vermelho)]"
                        : video.watched
                          ? "text-green-600"
                          : "text-zinc-500"
                    }`}
                  >
                    {currentVideo.id === video.id ? (
                      <LoaderCircle className="animate-spin" size={15} />
                    ) : video.watched === true ? (
                      <CircleCheckBig size={15} />
                    ) : (
                      <CircleDashed size={15} />
                    )}

                    <span>{video.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mr-auto w-full space-y-10 lg:max-w-[70%]">
          <Separator />
          <div className="flex w-full justify-between">
            <div className="flex gap-3">
              <Button className="hover:bg-[var(--vermelho)]">
                <ThumbsUp size={15} />
              </Button>
              <Button className="hover:bg-[var(--vermelho)]">
                <ThumbsDown size={15} />
              </Button>
            </div>
            <Button
              onClick={() => handleVideoWatched(currentVideo.id)}
              className="bg-green-900"
              disabled={currentVideo.watched}
            >
              {currentVideo.watched ? "Já visto" : "Marcar como visto"}
              <Check size={15} />
            </Button>
          </div>
          <Separator />
          <div className="space-y-5">
            <h1 className="text-xl font-semibold">Descrição da aula</h1>
            <p className="rounded-md bg-stone-800 p-5 text-sm text-zinc-300">
              {currentVideo.description}
            </p>
          </div>
          <div className="space-y-5">
            <h1 className="text-center font-semibold lg:text-xl">
              Deixe um comentário sobre essa aula
            </h1>
            <CommentsSection classId={currentVideo.id} />
          </div>
        </div>
      </section>
    </ProtectedRouter>
  );
};

export default Modulos;
