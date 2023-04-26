import { NextApiRequest, NextApiResponse } from 'next';
import { list as enList } from '@/data/en/list';
import { list as zhList } from '@/data/zh/list';
import { list as jaList } from '@/data/ja/list';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { locale } = req.query;

  let list;
  if (locale === 'zh') {
    list = zhList;
  } else if (locale === 'ja') {
    list = jaList;
  } else {
    list = enList;
  }

  res.status(200).json({ list });
};

export default handler;
