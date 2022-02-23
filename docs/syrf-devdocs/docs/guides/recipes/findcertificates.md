---
sidebar_position: 3
---

# Search Certificates

SYRF provides the first API to search certificates across all major certifying agencies, including a common format for polars.
You can determine if a certificate is valid by comparing 'now' to the initialized and expiration dates on the certificate.

There are a variety of reasons developers may want to find expired certificates:

* Research on VPP accuracy,
* To get a sample polar for a type of boat,
* To re-score old races.

The steps to find certificates and competition units are very similar. 
If you are interested in complex queries beyond this guide, check out the [ElasticSearch DSL Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html).

## Step 1) Authenticate:

Anonymous login requires a unique device Id for every session. We recommend doing this from the back end, but if you want to use a client app for
these requests please ensure you are providing a unique device Id such as a hardware identifier. 

Make a POST to `https://liveserver-dev.syrf.io/v1/auth/anonymous-login` with a body containing:
```
{ 
    "id":DEVICE-ID
    “devToken”: YOUR-DEVELOPER-API-KEY
}
```

The request will return a session token for you to store and use in further API requests.
```
myToken = result.body.token
```

Provide this session token as “token” bearer in the header of future requests.

## Step 2) Find Certificates

### Search
SYRF allows you to search for certificates by a variety of different fields. 
You can wrap this API in your own UI to allow your users to find certificates for their boats.

Certificates may or may not have polars associated with them.

#### Fields

SYRF allows you to search certificates across a variety of fields. Some fields may be blank.ß

:::info Note
Our search backend uses Elasticsearch, which supports fuzzy queries automatically.
There's no need to worry about things like capitalization and minor misspellings.
:::


The following fields are searchable:
* `organization`: The string of the issuing organization of the certificate.
    * Examples: 
        * 'ORC'
        * 'ORR'
        * 'IRC'
        * 'CYOA'
    * Query Example: `"organization(ORC)"`
* `cert_type`: A string indicating some special type of certificate.
    * Examples:
        * 'ORR-EZ'
    * Query Example: `"cert_type(ORR-EZ)"`
* `builder`: The builder of the vessel. 
    * Examples:
        * 'Oyster'
    * Query Example: `"builder(Beneteau)"`
* `cert_number`: The issued certificate number.
    * Query Example: `"cert_number(1234)"`
    * Note: there is no guarenteed uniqueness in cert number. Two different orgs may issue certificate #1234. You should combine this search with another field.
* `original_id`: The original ID of the certificate. Some certificates have both an id and a cert number.
    * Query Example: `"original_id(7893)"`
* `issued_date`: The iso formatted date string of the date issued.
    * Examples:
        * '2021-05-14'
    * Query Example: `"issued_date(2021-05-14)"`
* `expire_date`: The iso formatted date string of the date of expiration. 
    * Examples:
        * '2022-05-14'
    * Query Example: `"expire_date(2022-05-14)"`
* `measure_date`: The iso formatted date string of the date of measurement.
    * Examples:
        * '2021-05-10'
    * Query Example: `"measure_date(2021-05-10)"`
* `country`: The country of the boat.
    * Examples:
        * 'Finland'
    * Query Example: `"country(Finland)"`
* `sail_number`: The sail number of the boat.
    * Note: This sail number is not guarenteed to be unique.
    * Examples:
        * 'USA123'
    * Query Example: `"sail_number(USA123)"`
* `boat_name`: The name of the boat.
    * Examples:
        * 'Dorade'
    * Query Example: `"boat_name(Comanche)"`
* `has_polars`: Whether the cert includes polars.
    * Examples:
        * 'True'
        * 'False'
    * Query Example: `"has_polars(True)"`


#### Search within one field

Once you have your session token, be sure to provide it as the bearer in every additional request. 
To search for one field, you can include that field query in the body of a POST request.

Make a POST to `https://liveserver-dev.syrf.io/v1/certificates/search`. 
In the body of your request, include this example:

```
{
    "query": {
        "query_string": {
            "query": "boat_name(Dorade)"
        }
    }
}
```

#### Search by multiple fields
Suppose you'd like to narrow your search results, by logically `AND`ing searches accross fields. 
You can do so by replacing your "query" string with something like this:

`"query":"boat_name:(Dorade) AND organization:(ORC)"`

#### Search results
Different certifying organizations depict different information on their certificates.
Some certificates have polars, and some don't. Some have time allowances (inverse polars) and some don't.
The best way to see what information is associated with a certificate is to make a simple test request.
Here is a sample result with an ORC certificate, which typically has the most information.

The result contains one certificate.

```

{
  "took": 12,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 10000,
      "relation": "gte"
    },
    "max_score": 0.45214278,
    "hits": [
      {
        "_index": "vessel-cert",
        "_type": "_doc",
        "_id": "48ea4a06-8a5b-48ce-a58c-bf8d3b7781b5",
        "_score": 0.45214278,
        "_source": {
          "syrf_id": "48ea4a06-8a5b-48ce-a58c-bf8d3b7781b5",
          "organization": "ORC",
          "cert_type": "ORC Standard",
          "builder": "Comar Yachts",
          "owner": null,
          "cert_number": "14974",
          "issued_date": "2021-03-10T20:21:38.773Z",
          "expire_date": "2022-03-10T00:00:00.000Z",
          "measureDate": null,
          "country": "Italy",
          "sail_number": "ITA-14974",
          "boat_name": "LOLA",
          "class_name": "Comet  45 S",
          "beam": null,
          "draft": null,
          "displacement": null,
          "extras": "{\"NatAuth\":\"ITA\",\"BIN\":\"I14974\",\"CertNo\":\"14974\",\"RefNo\":\"03190000WES\",\"SailNo\":\"ITA-14974\",\"YachtName\":\"LOLA\",\"Class\":\"Comet  45 S\",\"Builder\":\"Comar Yachts\",\"Designer\":\"A Vallicelli & C.\",\"Address3\":\"R.C.C Tevere Remo\",\"C_Type\":\"INTL\",\"Family\":\"ORC\",\"Division\":\"C\",\"IssueDate\":\"2021-03-10T20:21:38.773Z\",\"Dspl_Sailing\":12774,\"WSS\":41.86,\"Area_Main\":58.5,\"Area_Jib\":53.61,\"Area_Sym\":0,\"Area_Asym\":181.97,\"Age_Year\":2003,\"CrewWT\":750,\"LOA\":13.72,\"IMSL\":12.612,\"Draft\":2.393,\"MB\":4.212,\"Dspl_Measurement\":11528,\"Stability_Index\":122,\"Dynamic_Allowance\":0.224,\"GPH\":572.2,\"CDL\":11.238,\"ILCWA\":635.8,\"TMF_Inshore\":0.9437,\"APHD\":509.4,\"APHT\":1.1779,\"OSN\":556.9,\"TMF_Offshore\":1.0773,\"TND_Offshore_Low\":657.6,\"TN_Offshore_Low\":0.9124,\"TND_Offshore_Medium\":505.4,\"TN_Offshore_Medium\":1.1872,\"TND_Offshore_High\":454.7,\"TN_Offshore_High\":1.3195,\"TND_Inshore_Low\":855.9,\"TN_Inshore_Low\":0.701,\"TND_Inshore_Medium\":630.6,\"TN_Inshore_Medium\":0.9514,\"TND_Inshore_High\":553.3,\"TN_Inshore_High\":1.0844,\"Pred_Up_TOD\":554.5,\"Pred_Up_TOT\":1.0821,\"Pred_Down_TOD\":514.2,\"Pred_Down_TOT\":1.1669,\"US_PREDUP_L_TOD\":746.7,\"US_PREDUP_L_TOT\":0.8035,\"US_PREDUP_M_TOD\":574.8,\"US_PREDUP_M_TOT\":1.0438,\"US_PREDUP_H_TOD\":531.8,\"US_PREDUP_H_TOT\":1.1282,\"US_PREDDN_L_TOD\":709.1,\"US_PREDDN_L_TOT\":0.8461,\"US_PREDDN_M_TOD\":508,\"US_PREDDN_M_TOT\":1.1811,\"US_PREDDN_H_TOD\":434,\"US_PREDDN_H_TOT\":1.3825,\"US_CHIMAC_UP_TOT\":1.0617,\"US_CHIMAC_AP_TOT\":1.1014,\"US_CHIMAC_DN_TOT\":1.1481,\"US_BAYMAC_CV_TOT\":1.021,\"US_BAYMAC_SH_TOT\":1.0268,\"US_HARVMOON_TOD\":445.8,\"US_HARVMOON_TOT\":1.346,\"US_VICMAUI_TOT\":1.2187,\"KR_PREDR_TOD\":490.4,\"RSA_CD_INS_TOD\":538.7,\"RSA_CD_INS_TOT\":1.1138,\"RSA_CD_OFF_TOD\":444.8,\"RSA_CD_OFF_TOT\":1.3489,\"Allowances\":{\"WindSpeeds\":[6,8,10,12,14,16,20],\"WindAngles\":[52,60,75,90,110,120,135,150],\"R52\":[647.2,543.1,484.7,459.8,450.6,446.3,442.2],\"R60\":[608.7,515.2,466.5,446.3,437.2,433.1,430.2],\"R75\":[579,489.5,451.3,435.5,424.4,416.6,409.8],\"R90\":[558.1,472.3,438.7,422.3,411.3,404.3,390.3],\"R110\":[571.2,474.2,435.8,417.4,404,388.6,361.7],\"R120\":[585.5,482.1,439.2,417.4,398.5,383,357.3],\"R135\":[652.4,525.9,459.3,430.4,410.4,389.9,349.9],\"R150\":[773.3,617.2,521.1,464.2,439.1,422.9,392.2],\"Beat\":[998.5,819.6,722.7,672.1,651.9,643,630.7],\"Run\":[893,712.7,601.7,536,505.6,477.4,428.2],\"BeatAngle\":[43.5,41.6,41.2,40.9,40.1,39.8,39.4],\"GybeAngle\":[143.5,147,147.5,150,151.2,175,178],\"WL\":[945.7,766.1,662.2,604.1,578.8,560.2,529.5],\"CR\":[722.2,592.9,524.6,489.4,472,459.3,438.6],\"OC\":[940.4,717.3,594,523.5,489.7,463.6,420]}}",
          "has_polars": true,
          "polars": {
            "windSpeeds": [
              6,
              8,
              10,
              12,
              14,
              16,
              20
            ],
            "beatAngles": [
              43.5,
              41.6,
              41.2,
              40.9,
              40.1,
              39.8,
              39.4
            ],
            "beatVMGs": [
              3.605408112168252,
              4.392386530014641,
              4.9813200498132,
              5.356345781877697,
              5.522319374137138,
              5.598755832037325,
              5.707943554780402
            ],
            "polars": [
              {
                "twa": 52,
                "speeds": [
                  5.562422744128553,
                  6.628613515006444,
                  7.427274602847122,
                  7.8294910830796,
                  7.989347536617842,
                  8.066323101053102,
                  8.14111261872456
                ]
              },
              {
                "twa": 60,
                "speeds": [
                  5.914243469689501,
                  6.987577639751552,
                  7.717041800643087,
                  8.066323101053102,
                  8.234217749313816,
                  8.312168090510275,
                  8.368200836820083
                ]
              },
              {
                "twa": 75,
                "speeds": [
                  6.217616580310881,
                  7.354443309499489,
                  7.976955461998671,
                  8.266360505166475,
                  8.482563619227145,
                  8.641382621219394,
                  8.784773060029282
                ]
              },
              {
                "twa": 90,
                "speeds": [
                  6.450456907364272,
                  7.622273978403557,
                  8.206063369044905,
                  8.524745441629173,
                  8.752735229759299,
                  8.904279000742022,
                  9.223674096848578
                ]
              },
              {
                "twa": 110,
                "speeds": [
                  6.302521008403361,
                  7.591733445803459,
                  8.260670032124828,
                  8.624820316243412,
                  8.910891089108912,
                  9.264024704065877,
                  9.952999723527785
                ]
              },
              {
                "twa": 120,
                "speeds": [
                  6.148590947907771,
                  7.4673304293715,
                  8.19672131147541,
                  8.624820316243412,
                  9.03387703889586,
                  9.399477806788513,
                  10.075566750629722
                ]
              },
              {
                "twa": 135,
                "speeds": [
                  5.518087063151441,
                  6.845407872219053,
                  7.838014369693011,
                  8.364312267657994,
                  8.771929824561404,
                  9.23313670171839,
                  10.288653901114605
                ]
              },
              {
                "twa": 150,
                "speeds": [
                  4.655373076425708,
                  5.832793259883344,
                  6.90846286701209,
                  7.755277897457993,
                  8.198588020951947,
                  8.512650744856941,
                  9.178990311065784
                ]
              }
            ],
            "runVMGs": [
              4.031354983202688,
              5.0512136944015715,
              5.983048030580023,
              6.7164179104477615,
              7.120253164556962,
              7.54084625052367,
              8.407286314806166
            ],
            "gybeAngles": [
              143.5,
              147,
              147.5,
              150,
              151.2,
              175,
              178
            ]
          },
          "hasTimeAllowances": true,
          "timeAllowances": {
            "windSpeeds": [
              6,
              8,
              10,
              12,
              14,
              16,
              20
            ],
            "beatVMGs": [
              998.5,
              819.6,
              722.7,
              672.1,
              651.9,
              643,
              630.7
            ],
            "timeAllowances": [
              {
                "twa": 52,
                "speeds": [
                  647.2,
                  543.1,
                  484.7,
                  459.8,
                  450.6,
                  446.3,
                  442.2
                ]
              },
              {
                "twa": 60,
                "speeds": [
                  608.7,
                  515.2,
                  466.5,
                  446.3,
                  437.2,
                  433.1,
                  430.2
                ]
              },
              {
                "twa": 75,
                "speeds": [
                  579,
                  489.5,
                  451.3,
                  435.5,
                  424.4,
                  416.6,
                  409.8
                ]
              },
              {
                "twa": 90,
                "speeds": [
                  558.1,
                  472.3,
                  438.7,
                  422.3,
                  411.3,
                  404.3,
                  390.3
                ]
              },
              {
                "twa": 110,
                "speeds": [
                  571.2,
                  474.2,
                  435.8,
                  417.4,
                  404,
                  388.6,
                  361.7
                ]
              },
              {
                "twa": 120,
                "speeds": [
                  585.5,
                  482.1,
                  439.2,
                  417.4,
                  398.5,
                  383,
                  357.3
                ]
              },
              {
                "twa": 135,
                "speeds": [
                  652.4,
                  525.9,
                  459.3,
                  430.4,
                  410.4,
                  389.9,
                  349.9
                ]
              },
              {
                "twa": 150,
                "speeds": [
                  773.3,
                  617.2,
                  521.1,
                  464.2,
                  439.1,
                  422.9,
                  392.2
                ]
              }
            ],
            "runVMGs": [
              893,
              712.7,
              601.7,
              536,
              505.6,
              477.4,
              428.2
            ],
            "gybeAngles": [
              143.5,
              147,
              147.5,
              150,
              151.2,
              175,
              178
            ]
          },
          "original_id": "03190000WES"
        }
      }, ... // Other matching certs would be listed here.
    ]
  }
}


```

### Extras
Where possible, we include the raw data associated with the certificate.
Common extra formats include:

* json
* Base64 encoded PDF files
* Base64 encoded HTML pages

:::danger Don't query the extras field!
Never query the extras field. It won't work, but it will slow things down for everyone. If you query the extras field, you will have your access revoked.
:::

### Polars
Polars have wind speed and boat speet units of kts regardless of the standard of the organization.

### Time Allowances
Time allowances have units of seconds per nautical mile.

