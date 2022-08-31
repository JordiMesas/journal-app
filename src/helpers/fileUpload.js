export const fileUpload = async (file) => {
    if(!file) return null;
	const cloudUrl = 'https://api.cloudinary.com/v1_1/dqw5l7qxy/upload';

	const formData = new FormData();
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);

	try {
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,
		});

		if (resp.ok) {
			const cloudResp = await resp.json();
			return cloudResp.secure_url;
		} else {
			throw await resp.json();
		}
	} catch (err) {
		// throw err;
        return null;
	}

	// return url de la imagen
};
