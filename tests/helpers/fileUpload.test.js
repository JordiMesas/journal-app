import { fileUpload } from '../../src/helpers/fileUpload';

describe('fileUpload testing', () => {
	test('debe de subir el archivo correctamente', async () => {
		const imageUrl =
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRghXrba1Phh46N7hxBH4Hl300CrY7-d1NnCg&usqp=CAU';
		const resp = await fetch(imageUrl);
		const blob = await resp.blob();
		const file = new File([blob], 'foto.jpg');
		const url = await fileUpload(file);

		expect(typeof url).toBe('string');
	});

	test('debe de retornar null', async() => {
		const file = new File([], 'foto.jpg');
		const url = await fileUpload(file);
		expect(url).toBe(null);
	});
});
