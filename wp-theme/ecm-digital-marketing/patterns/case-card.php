<?php
/**
 * Title: Case-kort
 * Slug: ecm-digital-marketing/case-card
 * Categories: ecm
 * Description: Ét projekt-/case-kort med id, titel, beskrivelse og procestags (fx Problem / Analyse / Løsning).
 * Keywords: case, projekt, portfolio
 * Block Types: core/post-content
 * Inserter: true
 */
?>
<!-- wp:group {"className":"case-card","layout":{"type":"flow"}} -->
<div class="wp-block-group case-card">
	<!-- wp:paragraph {"className":"case-id"} -->
	<p class="case-id">Case XX — Kategori</p>
	<!-- /wp:paragraph -->
	<!-- wp:heading {"level":3} -->
	<h3 class="wp-block-heading">Titel på projektet</h3>
	<!-- /wp:heading -->
	<!-- wp:paragraph {"className":"desc"} -->
	<p class="desc">Kort beskrivelse af opgaven og hvad den gik ud på.</p>
	<!-- /wp:paragraph -->
	<!-- wp:group {"className":"case-flow","layout":{"type":"flex","flexWrap":"wrap"}} -->
	<div class="wp-block-group case-flow">
		<!-- wp:paragraph --><p>Problem</p><!-- /wp:paragraph -->
		<!-- wp:paragraph --><p>Analyse</p><!-- /wp:paragraph -->
		<!-- wp:paragraph --><p>Løsning</p><!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
