<?php
/**
 * Title: CTA-banner (mørk sektion)
 * Slug: ecm-digital-marketing/cta-banner
 * Categories: ecm, call-to-action
 * Description: Mørk, centreret sektion med overskrift, tekst og en eller to knapper — bruges til afsluttende opfordringer ("Klar til at søge ind?", "Tag testen her").
 * Keywords: cta, opfordring, banner, mørk
 * Block Types: core/post-content
 * Inserter: true
 */
?>
<!-- wp:group {"tagName":"section","className":"final-cta","layout":{"type":"flow"}} -->
<section class="wp-block-group final-cta">
	<!-- wp:group {"className":"wrap","layout":{"type":"constrained"}} -->
	<div class="wp-block-group wrap">
		<!-- wp:heading -->
		<h2 class="wp-block-heading">Skriv en overskrift, der opfordrer til handling</h2>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"className":"lede"} -->
		<p class="lede">En kort sætning, der understøtter overskriften og gør det tydeligt, hvad der sker, når man klikker.</p>
		<!-- /wp:paragraph -->

		<!-- wp:buttons {"className":"hero-actions"} -->
		<div class="wp-block-buttons hero-actions">
			<!-- wp:button {"className":"is-style-on-dark"} -->
			<div class="wp-block-button is-style-on-dark"><a class="wp-block-button__link" href="#">Primær handling →</a></div>
			<!-- /wp:button -->

			<!-- wp:button {"className":"is-style-outline"} -->
			<div class="wp-block-button is-style-outline"><a class="wp-block-button__link" href="#">Sekundær handling</a></div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
