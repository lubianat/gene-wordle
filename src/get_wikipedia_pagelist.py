
import json
from SPARQLWrapper import SPARQLWrapper, JSON

user_agent = "gene-wordle (https://github.com/lubianat/gene-wordle)"

sparqlwd = SPARQLWrapper("https://query.wikidata.org/sparql", agent=user_agent)

query = """
SELECT DISTINCT
  ?item ?gene_symbol ?score ?article
WHERE 
{
  ?item wdt:P353 ?gene_symbol .
  ?item wdt:P688 ?protein . 
  ?item wikibase:sitelinks ?sitelink_gene .
  ?protein wikibase:sitelinks ?sitelink_protein .
  BIND(2.5 * ?sitelink_gene + ?sitelink_protein as ?score)
  
  OPTIONAL 
  {
    ?article_gene schema:about ?item .
  ?article_gene schema:inLanguage "en" .
  FILTER (SUBSTR(str(?article_gene), 1, 25) = "https://en.wikipedia.org/")
  }
  
  OPTIONAL 
  {
    ?article_protein schema:about ?protein .
    ?article_protein schema:inLanguage "en" .
    FILTER (SUBSTR(str(?article_protein), 1, 25) = "https://en.wikipedia.org/")
  }

  BIND(COALESCE(?article_gene, ?article_protein) as ?article)

}
ORDER BY 
  DESC (?score)   
"""

sparqlwd.setQuery(query)
sparqlwd.setReturnFormat(JSON)
data = sparqlwd.query().convert()

wikipedia_pages = {}
for result in data["results"]["bindings"]: 
    gene = result["gene_symbol"]["value"]
    if len(gene) <6:
        missing_letters = 5 - len(gene)
        print("-" * missing_letters)

        fixed_name = gene + "-" * missing_letters

    try:
      wikipedia_pages[fixed_name] = result["article"]["value"]
    except:
      wikipedia_pages[fixed_name] = "None"


with open("src/constants/wikipedialist.json", "w+") as f:
    f.write(json.dumps(wikipedia_pages,indent=4))