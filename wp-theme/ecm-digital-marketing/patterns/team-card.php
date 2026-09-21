<?php
/**
 * Title: Teamprofil-kort
 * Slug: ecm-digital-marketing/team-card
 * Categories: ecm, team
 * Description: Ét profilkort til "Mød os"-siden: billedplaceholder, navn, alder/baggrund og en kort bio. Indsæt flere for at udvide gruppen.
 * Keywords: team, profil, om os, person
 * Block Types: core/post-content
 * Inserter: true
 */
?>
<!-- wp:group {"className":"team-card","layout":{"type":"flow"}} -->
<div class="wp-block-group team-card">
	<!-- wp:group {"className":"photo","layout":{"type":"flow"}} -->
	<div class="wp-block-group photo">
		<!-- wp:paragraph {"className":"ph-badge"} -->
		<p class="ph-badge" style="position:absolute;top:14px;left:14px">Billede</p>
		<!-- /wp:paragraph -->
		<!-- wp:paragraph {"className":"ph-label"} -->
		<p class="ph-label">[BILLEDE: Portræt, afslappet og naturligt]</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
	<!-- wp:group {"className":"body","layout":{"type":"flow"}} -->
	<div class="wp-block-group body">
		<!-- wp:heading {"level":3} -->
		<h3 class="wp-block-heading">Navn Navnesen</h3>
		<!-- /wp:heading -->
		<!-- wp:paragraph {"className":"role"} -->
		<p class="role">Alder · baggrund</p>
		<!-- /wp:paragraph -->
		<!-- wp:paragraph {"className":"bio"} -->
		<p class="bio">Kort tekst om personen: hvorfor de valgte ECM, og hvad de drømmer om at bruge uddannelsen til.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
