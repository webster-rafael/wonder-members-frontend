interface YoutubeFrameProps {
  videoId: string;
}
const YoutubeFrame = ({ videoId }: YoutubeFrameProps) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube video"
      className="h-full w-full rounded-md"
    />
  );
};

export default YoutubeFrame;
