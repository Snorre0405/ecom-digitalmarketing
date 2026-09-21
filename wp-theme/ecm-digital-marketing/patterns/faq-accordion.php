<?php
/**
 * Title: FAQ-liste (foldud)
 * Slug: ecm-digital-marketing/faq-accordion
 * Categories: ecm
 * Description: En liste af spørgsmål/svar, der folder ud ved klik. Bygget med kernens Details-blok — helt tilgængelig uden JavaScript.
 * Keywords: faq, spørgsmål, accordion, foldud
 * Block Types: core/post-content
 * Inserter: true
 */
?>
<!-- wp:group {"className":"faq-list","layout":{"type":"flow"}} -->
<div class="wp-block-group faq-list">

	<!-- wp:details {"className":"faq-item","showContent":true} -->
	<details class="wp-block-details faq-item" open><summary>Skriv spørgsmålet her</summary>
	<!-- wp:paragraph -->
	<p>Skriv svaret her.</p>
	<!-- /wp:paragraph --></details>
	<!-- /wp:details -->

	<!-- wp:details {"className":"faq-item"} -->
	<details class="wp-block-details faq-item"><summary>Skriv endnu et spørgsmål</summary>
	<!-- wp:paragraph -->
	<p>Skriv svaret her.</p>
	<!-- /wp:paragraph --></details>
	<!-- /wp:details -->

	<!-- wp:details {"className":"faq-item"} -->
	<details class="wp-block-details faq-item"><summary>Og et tredje spørgsmål</summary>
	<!-- wp:paragraph -->
	<p>Skriv svaret her.</p>
	<!-- /wp:paragraph --></details>
	<!-- /wp:details -->

</div>
<!-- /wp:group -->
