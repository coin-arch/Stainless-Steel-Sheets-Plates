
export const FALLBACK_IMAGE = '/images/slider-hd-1.png';

const SPECIFIC_MAPPINGS: Record<string, string> = {
    // Homepage "Category" Slugs -> Specific Legacy Grade Images
    'stainless-steel-sheets-plates-manufacturer-stockist': 'stainless-steel-304-304l-304h-sheets-plates-manufacturer-stockist.jpg',
    'carbon-steel-sheets-plates-manufacturer-stockist': 'sheet-plates.jpg',
    'duplex-steel-sheets-plates-manufacturer-stockist': 'duplex-f51-31803-f53-s32205-sheets-plates-manufacturer-stockist.jpg',
    'nickel-alloy-sheets-plates-manufacturer-stockist': 'alloy-400-plate-stockist.jpg',
    'titanium-sheets-plates-manufacturer-stockist': 'titanium-alloys-gr2-gr5-gr7-strips-sheets-plates-coils.jpg',
    'strips-coils-manufacturer-stockist': 'strips-coils.jpg',
    'perforated-sheets-manufacturer-stockist': 'perforated-sheets.jpg',
    'stainless-steel-chequered-plates-manufacturer-stockist': 'chequered-plates.jpg',
    'aluminium-sheets-plates-manufacturer-stockist': 'aluminium-alloy-5083-5086-6013-6061-perforated-sheets.jpg',

    // Legacy Fittings (Keep if needed or remove)
    'stainless-steel-threaded-forged-fittings-manufacturer': 'stainless-steel-304-threaded-forged-fittings-supplier.jpg',
    'carbon-steel-threaded-forged-fittings-manufacturer': 'carbon-steel-a105-threaded-forged-fittings-supplier.jpg',
    'stainless-steel-socket-weld-fittings-manufacturer': 'stainless-steel-304-socketweld-fittings-supplier.jpg',
    'alloy-steel-threaded-forged-fittings-manufacturer': 'alloy-steel-f11-threaded-forged-fittings-supplier.jpg',
    'duplex-steel-s31803-s32205-threaded-forged-fittings-manufacturer': 'duplex-steel-s31803-s32205-threaded-forged-fittings-supplier.jpg',
    'high-nickel-alloy-threaded-forged-fittings-manufacturer': 'inconel-alloy-625-threaded-forged-fittings-supplier.jpg',
    'nickel-alloy-threaded-forged-fittings-manufacturer': 'nickel-alloy-200-threaded-forged-fittings-supplier.jpg',

    // Mappings for missing specific images (Fallbacks)
    'titanium-alloy-grade-2-socketweld-fittings-supplier': '/images/products/titanium-alloy-socketweld-fittings-supplier.jpg',
    'stainless-steel-316-316l-socketweld-fittings-supplier': '/images/products/stainless-steel-304-socketweld-fittings-supplier.jpg', // Fallback to 304
    'hastelloy-socketweld-fittings-supplier': '/images/products/hastelloy-c276-socketweld-fittings-supplier.jpg', // Fallback to C276
    'hastelloy-threaded-forged-fittings-supplier': '/images/products/hastelloy-c276-threaded-forged-fittings-supplier.jpg', // Fallback to C276
    'inconel-alloy-socketweld-fittings-supplier': '/images/products/inconel-alloy-600-socketweld-fittings-supplier.jpg', // Fallback to 600
    'inconel-alloy-threaded-forged-fittings-supplier': '/images/products/inconel-alloy-600-threaded-forged-fittings-supplier.jpg', // Fallback to 600
    'monel-alloy-socketweld-fittings-supplier': '/images/products/monel-alloy-400-socketweld-fittings-supplier.jpg', // Fallback to 400
    'monel-alloy-threaded-forged-fittings-supplier': '/images/products/monel-alloy-400-threaded-forged-fittings-supplier.jpg', // Fallback to 400

    // Correct Mappings for "Stockist" Items (which have -manufacturer slugs)
    'carbon-steel-socket-weld-fittings-manufacturer': '/images/products/carbon-steel-a105-socketweld-fittings-supplier.jpg', // Fallback to A105
    'hastelloy-socket-weld-fittings-manufacturer': '/images/products/hastelloy-c276-socketweld-fittings-supplier.jpg',
    'hastelloy-threaded-forged-fittings-manufacturer': '/images/products/hastelloy-c276-threaded-forged-fittings-supplier.jpg',
    'inconel-alloy-825-socket-weld-fittings-manufacturer': '/images/products/inconel-alloy-825-sockeweld-fittings-supplier.jpg', // typo in file
    'inconel-alloy-socket-weld-fittings-manufacturer': '/images/products/inconel-alloy-600-socketweld-fittings-supplier.jpg',
    'inconel-alloy-threaded-forged-fittings-manufacturer': '/images/products/inconel-alloy-600-threaded-forged-fittings-supplier.jpg',
    'monel-alloy-socket-weld-fittings-manufacturer': '/images/products/monel-alloy-400-socketweld-fittings-supplier.jpg',
    'monel-alloy-threaded-forged-fittings-manufacturer': '/images/products/monel-alloy-400-threaded-forged-fittings-supplier.jpg',

    // Stainless 316/316L/316TI Socket Weld Images are missing -> Fallback to 304
    'stainless-steel-316-socket-weld-fittings-manufacturer': '/images/products/stainless-steel-304-socketweld-fittings-supplier.jpg',
    'stainless-steel-316l-socket-weld-fittings-manufacturer': '/images/products/stainless-steel-304-socketweld-fittings-supplier.jpg',
    'stainless-steel-316ti-socket-weld-fittings-manufacturer': '/images/products/stainless-steel-304-socketweld-fittings-supplier.jpg',

    // Stainless 347 (Typo in file)
    'stainless-steel-347-socket-weld-fittings-manufacturer': '/images/products/stainless-steel-347-sockeweld-fittings-supplier.jpg',

    // Titanium Fallback
    'titanium-alloy-grade-2-socket-weld-fittings-manufacturer': '/images/products/titanium-alloy-socketweld-fittings-supplier.jpg',

    // Generic Nickel Alloy Mappings
    'nickel-alloy-socket-weld-fittings-manufacturer': 'nickel-alloy-200-socketweld-fittings-supplier.jpg',
    'titanium-alloy-threaded-forged-fittings-manufacturer': 'titanium-alloy-grade-2-threaded-forged-fittings-supplier.jpg',
    'cupro-nickel-threaded-forged-fittings-manufacturer': 'cupro-nickel-90-10-threaded-forged-fittings-supplier.jpg',



    // Specific Fixes for 15-5PH and Super Duplex (from User feedback)
    'stainless-steel-15-5ph-perforated-sheets-manufacturer-stockist': 'stainless-steel-15-5ph-chequered-plates-manufacturer-stockist.jpg',
    'super-duplex-steel-sheets-plates-manufacturer-stockist': 'super-duplex-steel-s32750-sheets-plates-manufacturer-stockist.jpg', // Mapped to S32750 explicitly
    'super-duplex-steel-perforated-sheets-manufacturer-stockist': 'super-duplex-steel-2760-chequered-plates-manufacturer-stockist.jpg',
};

export function getImageForProduct(slug: string): string {
    if (!slug) return FALLBACK_IMAGE;

    // 1. Check explicit mapping first
    if (SPECIFIC_MAPPINGS[slug]) {
        return `/images/${SPECIFIC_MAPPINGS[slug]}`;
    }

    // 2. Try variations
    const cleanSlug = slug.toLowerCase();

    // Priority 1: Check for exact match (most files seem to match the slug exactly now)
    // Priority 2: Check for 'manufacturer' -> 'supplier' replacement (for legacy files)

    // Logic for returning the path string (Client-side we can't check existence easily)
    // We will favor the EXACT slug match if it doesn't have the 'socket-weld' pattern (which works differently)

    return `/images/${cleanSlug}.jpg`;
}
