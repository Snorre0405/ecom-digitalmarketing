<?php
/**
 * Title: To kolonner — billede + tekst
 * Slug: ecm-digital-marketing/two-col-media-text
 * Categories: ecm, text-media
 * Description: Generisk to-kolonne-sektion med en billedplaceholder og en tekstspalte med eyebrow, overskrift og brødtekst. Stables på mobil.
 * Keywords: to kolonner, billede, tekst
 * Block Types: core/post-content
 * Inserter: true
 */
?>
<!-- wp:group {"tagName":"section","layout":{"type":"flow"}} -->
<section class="wp-block-group">
	<!-- wp:group {"className":"wrap two-col","layout":{"type":"flow"}} -->
	<div class="wp-block-group wrap two-col">

		<!-- wp:group {"layout":{"type":"flow"}} -->
		<div class="wp-block-group">
			<!-- wp:paragraph {"className":"eyebrow-tag"} -->
			<p class="eyebrow-tag">Eyebrow</p>
			<!-- /wp:paragraph -->
			<!-- wp:heading {"className":"h2","style":{"spacing":{"margin":{"top":"20px"}}}} -->
			<h2 class="wp-block-heading h2" style="margin-top:20px">Overskrift</h2>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"className":"lede"} -->
			<p class="lede">Brødtekst, der uddyber overskriften.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"media-placeholder","layout":{"type":"flow"}} -->
		<div class="wp-block-group media-placeholder">
			<!-- wp:paragraph {"className":"ph-badge"} -->
			<p class="ph-badge">Billede</p>
			<!-- /wp:paragraph -->
			<!-- wp:paragraph {"className":"ph-label"} -->
			<p class="ph-label">[BILLEDE: Beskriv, hvad billedet skal vise.]</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
