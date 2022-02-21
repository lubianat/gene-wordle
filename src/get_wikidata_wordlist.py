import json
from SPARQLWrapper import SPARQLWrapper, JSON

sparqlwd = SPARQLWrapper("https://query.wikidata.org/sparql")

query = """
SELECT ?gene_symbol ?sitelinks
WHERE 
{
  ?item wdt:P353 ?gene_symbol .
  ?item wikibase:sitelinks ?sitelinks .
}
ORDER BY DESC (?sitelinks)   
"""

sparqlwd.setQuery(query)
sparqlwd.setReturnFormat(JSON)
data = sparqlwd.query().convert()

gene_names = []
for result in data["results"]["bindings"]: 
    gene_names.append(result["gene_symbol"]["value"])

fixed_names = []
for gene in gene_names: 
    if len(gene) <6:
        missing_letters = 5 - len(gene)
        print("-" * missing_letters)

        fixed_name = gene + "-" * missing_letters
        fixed_names.append(fixed_name)


    else:
        continue
with open("src/constants/wordlist.ts", "w+") as f:
    f.write("export const WORDS = " +json.dumps(fixed_names[1:1000],indent=4))

fixed_names.sort()
with open("src/constants/validGuesses.ts", "w") as f:
    f.write("export const VALID_GUESSES = " + json.dumps(fixed_names,indent=4))