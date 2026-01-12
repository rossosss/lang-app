import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { courses, lessons, units, userProgress } from "@/db/schema";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),

    with: {
      activeCourse: true,
    }
  });

  return data;
});

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();
  
  if (!userProgress?.activeCourseId) {
    return [];
  } 

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgess: true,
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return challenge.challengeProgess
          && challenge.challengeProgess.length > 0
          && challenge.challengeProgess.every((progress) => progress.completed);
      });

      return { ... lesson, completed: allCompletedChallenges };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });
  return normalizedData
});

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getCourseById = cache(async (courceId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courceId),

    // TODO: Популярные разделы и уроки
  });

  return data;
});