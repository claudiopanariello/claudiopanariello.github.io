---
layout: post
title: "publications"
permalink: /publications/
published: true
order: 5
---

{% assign pubs = site.categories.publications | sort: "date" | reverse %}
{% assign journal_pubs = pubs | where: "type", "journal-article" %}
{% assign conf_pubs = pubs | where_exp: "p", "p.type == 'conference-paper' or p.type == 'workshop-paper'" %}
{% assign chapter_pubs = pubs | where_exp: "p", "p.type == 'book-chapter' or p.type == 'preface'" %}
{% assign thesis_pubs = pubs | where: "type", "dissertation" %}

{% if journal_pubs.size > 0 %}
### Journal articles

{% for pub in journal_pubs -%}
- {{ pub.authors }} ({{ pub.year }}). &#8220;{{ pub.title }}.&#8221; *{{ pub.journal }}*{% if pub.venue %}, {{ pub.venue }}{% endif %}.
{% endfor %}
{% endif %}

{% if conf_pubs.size > 0 %}
### Conference and workshop papers

{% for pub in conf_pubs -%}
- {{ pub.authors }} ({{ pub.year }}). {{ pub.title }}. *{{ pub.venue }}*.
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
