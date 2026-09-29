---
layout: post
title: "publications"
permalink: /publications/
published: true
order: 5
---

{% assign pubs = site.categories.publications | sort: "date" | reverse %}
{% assign journal_pubs = pubs | where: "type", "journal-article" %}

{% assign conf_a = pubs | where: "type", "conference-paper" %}
{% assign conf_b = pubs | where: "type", "workshop-paper" %}
{% assign conf_pubs = conf_a | concat: conf_b | sort: "date" | reverse %}

{% assign chap_a = pubs | where: "type", "book-chapter" %}
{% assign chap_b = pubs | where: "type", "preface" %}
{% assign chapter_pubs = chap_a | concat: chap_b | sort: "date" | reverse %}

{% assign thesis_pubs = pubs | where: "type", "dissertation" %}


{% if conf_pubs.size > 0 %}
### Conference and workshop papers

{% for pub in conf_pubs -%}
- {{ pub.authors }} ({{ pub.year }}). {{ pub.title }}. *{{ pub.venue }}*.
{% endfor %}
{% endif %}

{% if journal_pubs.size > 0 %}
### Journal articles

{% for pub in journal_pubs -%}
- {{ pub.authors }} ({{ pub.year }}). &#8220;{{ pub.title }}.&#8221; *{{ pub.journal }}*{% if pub.venue %}, {{ pub.venue }}{% endif %}.
{% endfor %}
{% endif %}

{% if chapter_pubs.size > 0 %}
### Book chapters and other writings

{% for pub in chapter_pubs -%}
- {{ pub.authors }} ({{ pub.year }}). {{ pub.title }}.{% if pub.venue %} {{ pub.venue }}.{% endif %}
{% endfor %}
{% endif %}

{% if thesis_pubs.size > 0 %}
### Dissertation

{% for pub in thesis_pubs -%}
- {{ pub.authors }} ({{ pub.year }}). *{{ pub.title }}*{% if pub.note %} {{ pub.note }}{% endif %}.
{% endfor %}
{% endif %}
