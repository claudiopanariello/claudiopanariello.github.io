---
layout: post
title: "publications"
permalink: /publications/
published: true
order: 5
---

{% assign pubs = site.categories.publications | sort: "date" | reverse %}
{%- for pub in pubs -%}
- {{ pub.authors }} ({{ pub.year }}). {{ pub.title }}.{% if pub.venue != blank %} {{ pub.venue }}.{% endif %}
{% endfor %}
