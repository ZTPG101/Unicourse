import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

// Define the lesson type (adjust fields as needed)
interface Lesson {
  id: number;
  title: string;
  content: string;
  videoUrl?: string;
  duration?: number;
  courseId: number;
}

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch(`/api/lessons/${lessonId}`)
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lessonId]);

  if (loading) return <div>Loading...</div>;
  if (!lesson) return <div>Lesson not found.</div>;

  return (
    <div className="lesson-page container">
      <Link
        to={`/course-details/${lesson.courseId}`}
        state={{ activeTab: "curriculum" }}
        className="btn btn-secondary"
        style={{ marginBottom: 16 }}
      >
        &larr; Back to Curriculum
      </Link>
      <h1>{lesson.title}</h1>
      {lesson.videoUrl && (
        <div className="lesson-video" style={{ margin: "24px 0" }}>
          <video width="100%" controls>
            <source src={lesson.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div
        className="lesson-content"
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      />
      {lesson.duration && (
        <div className="lesson-duration" style={{ marginTop: 16 }}>
          <strong>Duration:</strong> {lesson.duration} minutes
        </div>
      )}
    </div>
  );
};

export default LessonPage;
