/*
 * The artworks and stickers, ready to display.
 * The files live in src/art/ so that Astro can make smaller copies of them at build time: the grids load small copies, and the zoom loads the full file.
 * art.json names each file, and this module adds the image Astro loaded from it. Its width and height come from the file itself.
 */
import type { ImageMetadata } from 'astro';
import artPieces from './art.json';

const imageFiles = import.meta.glob<{ default: ImageMetadata }>('../art/*', { eager: true });

const imageOf = (file: string) => {
	const image = imageFiles[`../art/${file}`]?.default;
	if (!image) {
		throw new Error(`art.json lists ${file}, but there is no such file in src/art/`);
	}
	return image;
};

export const artworks = artPieces.map((piece) => ({ ...piece, image: imageOf(piece.file) }));

export type Artwork = (typeof artworks)[number];

export const artworkById = (id: string) => artworks.find((piece) => piece.id === id);

/*
 * The "gate" of a piece in art.json: "none", or a reason to blur it until the visitor chooses to see it.
 * The label is the button shown on the blurred image.
 */
const gateLabels: Record<string, string> = {
	explicit: 'Peek (18+)',
	arachnid: 'Spider ahead · Show',
};

export const gateLabelOf = (piece: Artwork) => (piece.gate === 'none' ? undefined : (gateLabels[piece.gate] ?? 'Show'));
