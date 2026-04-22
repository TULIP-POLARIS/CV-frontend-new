const BASE_URL =
  'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net';

type Headers = {
  token: string;
};

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

const jsonHeaders = (token: string) => ({
  ...authHeaders(token),
  'Content-Type': 'application/json',
});


export const loadProfile = async (token: string) => {
  const [personalRes, educationRes, workRes, skillsRes, languagesRes] =
    await Promise.all([
      fetch(`${BASE_URL}/api/profile/personal`, {
        headers: jsonHeaders(token),
      }),
      fetch(`${BASE_URL}/api/profile/education`, {
        headers: jsonHeaders(token),
      }),
      fetch(`${BASE_URL}/api/profile/work`, {
        headers: jsonHeaders(token),
      }),
      fetch(`${BASE_URL}/api/profile/skills`, {
        headers: jsonHeaders(token),
      }),
      fetch(`${BASE_URL}/api/profile/languages`, {
        headers: jsonHeaders(token),
      }),
    ]);

  const personal = personalRes.ok ? await personalRes.json() : null;
  const education = educationRes.ok ? await educationRes.json() : [];
  const work = workRes.ok ? await workRes.json() : [];
  const skills = skillsRes.ok ? await skillsRes.json() : [];
  const languages = languagesRes.ok ? await languagesRes.json() : [];

  let profilePictureUrl = null;

  try {
    const picRes = await fetch(
      `${BASE_URL}/api/profile/personal/picture`,
      { headers: authHeaders(token) }
    );

    if (picRes.ok) {
      const text = await picRes.text();
      profilePictureUrl = text || null;
    }
  } catch {}

  return {
    personal,
    education,
    work,
    skills,
    languages,
    profilePictureUrl,
  };
};


// =====================
// 📌 SAVE PERSONAL
// =====================
export const savePersonal = async (token: string, data: any) => {
  const res = await fetch(`${BASE_URL}/api/profile/personal`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify({
      ...data,
      dateOfBirth: data.dateOfBirth, // YYYY-MM-DD recommended
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
};


export const uploadProfilePicture = async (
  token: string,
  uri: string
) => {
  const formData = new FormData();

  formData.append('file', {
    uri,
    name: 'profile.jpg',
    type: 'image/jpeg',
  } as any);

  const res = await fetch(
    `${BASE_URL}/api/profile/personal/picture`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: formData,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return true;
};


export const deleteProfilePicture = async (token: string) => {
  await fetch(`${BASE_URL}/api/profile/personal/picture`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
};