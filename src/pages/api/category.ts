import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const options = {
  db: {
    schema: "course",
  },
};
const supabase = createClient(supabaseUrl, supabaseKey, options);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { locale } = req.query;

  try {
    const { data, error } = await supabase
        .from(`categories_${locale}`)
        .select()
    ;

    if (error) {
      throw error;
    }

    res.status(200).json({ list: data });
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
