/**
 * Serialise structured data for a <script type="application/ld+json"> tag.
 * JSON.stringify does not escape "<", so content containing "</script>" could break out of the tag.
 */
const LINE_SEPARATOR = new RegExp(String.fromCharCode(0x2028), 'g');
const PARAGRAPH_SEPARATOR = new RegExp(String.fromCharCode(0x2029), 'g');

export const jsonLdString = (data: unknown): string =>
  JSON.stringify(data)
    .replace(/</g, String.fromCharCode(92) + 'u003c')
    .replace(LINE_SEPARATOR, String.fromCharCode(92) + 'u2028')
    .replace(PARAGRAPH_SEPARATOR, String.fromCharCode(92) + 'u2029');
