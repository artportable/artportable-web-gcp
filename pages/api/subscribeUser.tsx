import fetch from "isomorphic-unfetch";

export default async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const AUDIENCE_ID = "8c2a2f581b";
    const API_KEY = "c27ec50919cde7202f403dc0e1e0cde5-us20";
    const DATACENTER = "us20";
    const data = {
      email_address: email,
      status: "subscribed",
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
        error: `There was an error subscribing to the newsletter.`,
      });
    }

    return res.status(201).json({ error: "" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
