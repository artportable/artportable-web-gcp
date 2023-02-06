const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID;
const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;

export default async (req, res) => {
  const { email } = req.body;

  try {
    const DATACENTER = "us20";
    const data = {
      email_address: email,
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,

      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    if (response.status === 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter`,
      });
    }

    return res.status(201).json({ error: "" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
