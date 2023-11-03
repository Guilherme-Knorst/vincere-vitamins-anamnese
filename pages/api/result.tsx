import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.body;
  // Then save email to your database, etc...
	res.status(200).json({
		uau: 'grande dia'
	})
}