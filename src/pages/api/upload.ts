import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      chineseTitle,
      englishTitle,
      category,
      pdfUrl,
      imageUrl,
      thumbnailUrl,
      videoUrl,
      location,
      duration,
      cost,
    } = req.body;

    try {
      const newCourse = await prisma.course.create({
        data: {
          chineseTitle,
          englishTitle,
          category,
          pdfUrl,
          imageUrl,
          thumbnailUrl,
          videoUrl,
          location,
          duration,
          cost,
        },
      });

      res.status(201).json(newCourse);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: "Error creating course", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb'
      }
  }
}