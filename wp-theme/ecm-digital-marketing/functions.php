<?php
/**
 * ECM — E-commerce & Digital Marketing
 *
 * Tema-opsætning for blocktemaet. Se WP-SETUP.md i temamappen for en
 * trin-for-trin guide til at få siden op at køre efter aktivering.
 *
 * @package ecm-digital-marketing
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Ingen direkte adgang.
}

/**
 * Tema-support.
 */
function ecm_theme_setup() {
	// Oversættelser (valgfrit, men god praksis).
	load_theme_textdomain( 'ecm-digital-marketing', get_template_directory() . '/languages' );

	// Block-tema-support.
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'custom-logo', array(
		'height'      => 60,
		'width'       => 200,
		'flex-height' => true,
		'flex-width'  => true,
	) );

	// Brug det samme designsprog i redigeringsruden som på selve siden.
	add_editor_style( 'assets/css/style.css' );

	// Billedstørrelser der matcher pladsholderformaterne fra det oprindelige design.
	add_image_size( 'ecm-hero', 1200, 900, true );      // Hero / "to studerende ved computerne".
	add_image_size( 'ecm-portrait', 600, 750, true );   // Teamprofiler (Mød os).
	add_image_size( 'ecm-card', 800, 600, true );       // Case- og galleribilleder.
}
add_action( 'after_setup_theme', 'ecm_theme_setup' );

/**
 * Indlæs stylesheet og scripts på frontend.
 */
function ecm_enqueue_assets() {
	$theme_version = wp_get_theme()->get( 'Version' );

	// Google Fonts — samme tre skrifter som i det oprindelige design.
	wp_enqueue_style(
		'ecm-fonts',
		'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
		array(),
		null
	);

	// Hoveddesign (komponenter, grid, tilgængelighed) — genbrugt fra det statiske site.
	wp_enqueue_style(
		'ecm-style',
		get_theme_file_uri( 'assets/css/style.css' ),
		array( 'ecm-fonts' ),
		$theme_version
	);

	// Reveal-on-scroll (progressivt forbedret, se assets/js/main.js).
	wp_enqueue_script(
		'ecm-main',
		get_theme_file_uri( 'assets/js/main.js' ),
		array(),
		$theme_version,
		true
	);

	// "Er ECM noget for dig?"-testen. Filen finder selv ud af, om #quizRoot
	// findes på den viste side, så den er harmløs at indlæse globalt.
	wp_enqueue_script(
		'ecm-quiz',
		get_theme_file_uri( 'assets/js/quiz.js' ),
		array(),
		$theme_version,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ecm_enqueue_assets' );

/**
 * Ekstra knap-stilarter (Buttons-blokken), der matcher det oprindelige
 * design: mørk knap og "on-dark" (gul knap til mørke sektioner). Den
 * lyse ghost/outline-knap dækkes af kernens indbyggede "Outline"-stil.
 */
function ecm_register_block_styles() {
	register_block_style(
		'core/button',
		array(
			'name'         => 'dark',
			'label'        => __( 'Mørk (ink)', 'ecm-digital-marketing' ),
			'inline_style' => '
				.wp-block-button.is-style-dark .wp-block-button__link {
					background-color: var(--wp--preset--color--ink);
					color: var(--wp--preset--color--bg);
				}
				.wp-block-button.is-style-dark .wp-block-button__link:hover {
					background-color: var(--wp--preset--color--accent);
					color: #fff;
				}
			',
		)
	);

	register_block_style(
		'core/button',
		array(
			'name'         => 'on-dark',
			'label'        => __( 'Gul (til mørke sektioner)', 'ecm-digital-marketing' ),
			'inline_style' => '
				.wp-block-button.is-style-on-dark .wp-block-button__link {
					background-color: var(--wp--preset--color--accent-2);
					color: var(--wp--preset--color--ink);
				}
				.wp-block-button.is-style-on-dark .wp-block-button__link:hover {
					background-color: var(--wp--preset--color--bg);
					color: var(--wp--preset--color--ink);
				}
			',
		)
	);
}
add_action( 'init', 'ecm_register_block_styles' );

/**
 * Egen mønster-kategori, så alle ECM-mønstre samles ét sted i
 * blok-inspiratoren ("+"-knappen i editoren).
 */
function ecm_register_pattern_categories() {
	register_block_pattern_category(
		'ecm',
		array( 'label' => __( 'ECM — sektioner', 'ecm-digital-marketing' ) )
	);
}
add_action( 'init', 'ecm_register_pattern_categories' );

/**
 * Tillad SVG-upload til de håndikoner, der bruges i kortgrid og
 * kontaktsektionen. Begrænset til brugere, der må uploade filer, og
 * WordPress' indbyggede sanitering af SVG gennem wp_kses.
 */
function ecm_allow_svg_upload( $mimes ) {
	if ( current_user_can( 'upload_files' ) ) {
		$mimes['svg'] = 'image/svg+xml';
	}
	return $mimes;
}
add_filter( 'upload_mimes', 'ecm_allow_svg_upload' );
