import { validateDomains, validatePanoramaNodes } from "./check-data";

async function main() {
  let hasError = false;

  // Validate domains
  try {
    // @ts-expect-error - domains.ts created in Task 6
    const { domains } = await import("../data/domains");
    validateDomains(domains);
    console.log("✓ domains.ts passed validation");
  } catch (e: unknown) {
    if (
      e instanceof Error &&
      "code" in e &&
      (e as NodeJS.ErrnoException).code === "ERR_MODULE_NOT_FOUND"
    ) {
      console.log("⚠ domains.ts not found, skipping domain validation");
    } else {
      console.error("✗ Domain validation failed:", (e as Error).message);
      hasError = true;
    }
  }

  // Validate panorama nodes
  try {
    // @ts-expect-error - panorama-domains.ts created in Task 6
    const { panoramaNodes } = await import("../data/panorama-domains");
    validatePanoramaNodes(panoramaNodes);
    console.log("✓ panorama-domains.ts passed validation");
  } catch (e: unknown) {
    if (
      e instanceof Error &&
      "code" in e &&
      (e as NodeJS.ErrnoException).code === "ERR_MODULE_NOT_FOUND"
    ) {
      console.log(
        "⚠ panorama-domains.ts not found, skipping panorama validation"
      );
    } else {
      console.error(
        "✗ Panorama validation failed:",
        (e as Error).message
      );
      hasError = true;
    }
  }

  if (hasError) {
    process.exit(1);
  }
}

main();
