// core.db.main.count({}, function (err, count) {
//     if (err) {
//         throw new Error("Failed checking the database: " + err);
//         return false;
//     }

//     if (count != 0) {
//         return true;
//     }

//     var doc = {
//         pages: {
//             669071589906025: {
//                 siteName: "靠北 AVA",
//                 pageName: "靠北AVA",
//                 hashtag: "#靠北AVA",
//                 pageUrl: "https://www.facebook.com/KaoBeiAVA",

//                 /**
//                  * afterPost is deprecated.
//                  * Edit this on the Admin page.
//                  */
//                 afterPost: "發文請至新系統 goo.gl/CxBGV1 並遵守使用條款",

//                 /**
//                  * PostLabel, PostPlaceholder and terms are deprecated.
//                  * Edit them in its own view page.
//                  */
//                 postLabel: "你都在靠北些什麼？",
//                 postPlaceholder: "請勿包含違法內容及能夠辨識被靠北人身份的字眼。我們將會記錄您的 IP 位置及您的行為，請勿提交無關 AVA 戰地之王遊戲 之貼文。如您不當地使用此網頁，必要時，我們有權利直接封鎖您的 IP 位置及使用者唯一辨識碼以阻止您使用此服務且我們將不會進行解鎖。感謝您的配合。",
//                 terms: "1. 管理員們每日縝密審查靠北貼文。如貼文內含有違反此條款之任何一項，管理員有權利依情況對貼文做出小幅度變更或選擇刪除該貼文而不做出任何提醒。必要時，我們有權利直接封鎖您的 IP 位置及使用者唯一辨識碼以阻止您使用此服務。<br /> 2. 靠北者之任何靠北內容不代表本粉絲專頁之觀點或立場。如有爭議，請私訊管理員。<br /> 3. 靠北者之任何靠北內容應不包含任何違反中華民國法律之規定。包括髒字、人身攻擊、洩露個資、廣告文、政治文、尋仇文、超短文、宣傳文（戰隊不限）、連結文、釣魚文、重複文及無意義之文章，均會遭到移除。<br /> 4. 靠北者之任何靠北內容應不冒充管理員做出任何公告。官方的公告均以粉絲專頁置頂文為準。<br /> 5. 在文章發佈後，我們不會依照使用者的要求刪除任何貼文。如該貼文有爭議請立即私訊我們以維護您的權益。<br /> 6. 若本條款的任何條款根據任何法律被整體或部分視為非法、無效或不可強制執行，此條款或相關部份應被視為不屬於本條款，本條款的餘下條文的合法性、有效性及可強制執行性應不受影響。<br /> 7. 在本條款中，詞彙 「包括」 指 「包括但不限於」。<br /> 8. 我們有權利在任何時間更改此條約而不做出任何公告。<br /> 9. 本網站保有一切最終解釋權利。",

//                 /**
//                  * access_token is deprecated.
//                  * We will store this in the database.
//                  */
//                 access_token: "CAAYJN4aj1KUBAC1aZBZCyyTyKXeTRl3LQDaJWGvoZBBe5brFPCuzpiOEyzwdQqcNCBUZCPk0JqiFVdFgtplx22QDZBwkndg8WgZCDrBknt58G0nB2IDxZCoUeqQ9qVAx7uKVMMoOPXJDKVm4u05yWnI5I0rcZBYiZAX6AZC13gEsUO6ZBigXdx3zZBOulZBfjiMMrd3IZD"
//             },

//             186928678317529: {
//                 siteName: "靠北 LOL",
//                 pageName: "靠北LOL",
//                 hashtag: "#靠北LOL",
//                 pageUrl: "https://www.facebook.com/KaoBeiLOL",
//                 afterPost: "發文請至新系統 goo.gl/a2e0WC 並遵守使用條款",
//                 postLabel: "你都在靠北些什麼？",
//                 postPlaceholder: "請勿包含違法內容及能夠辨識被靠北人身份的字眼。我們將會記錄您的 IP 位置及您的行為，請勿提交無關 LOL 英雄聯盟遊戲 之貼文。如您不當地使用此網頁，必要時，我們有權利直接封鎖您的 IP 位置及使用者唯一辨識碼以阻止您使用此服務且我們將不會進行解鎖。感謝您的配合。",
//                 terms: "1. 管理員們每日縝密審查靠北貼文。如貼文內含有違反此條款之任何一項，管理員有權利依情況對貼文做出小幅度變更或選擇刪除該貼文而不做出任何提醒。必要時，我們有權利直接封鎖您的 IP 位置及使用者唯一辨識碼以阻止您使用此服務。<br /> 2. 靠北者之任何靠北內容不代表本粉絲專頁之觀點或立場。如有爭議，請私訊管理員。<br /> 3. 靠北者之任何靠北內容應不包含任何違反中華民國法律之規定。包括髒字、人身攻擊、洩露個資、廣告文、政治文、尋仇文、超短文、宣傳文、連結文、釣魚文、重複文及無意義之文章，均會受到移除。<br /> 4. 靠北者之任何靠北內容應不冒充管理員做出任何公告。官方的公告均以粉絲專頁置頂文為準。<br /> 5. 在文章發佈後，我們不會依照使用者的要求刪除任何貼文。如該貼文有爭議請立即私訊我們以維護您的權益。<br /> 6. 若本條款的任何條款根據任何法律被整體或部分視為非法、無效或不可強制執行，此條款或相關部份應被視為不屬於本條款，本條款的餘下條文的合法性、有效性及可強制執行性應不受影響。<br /> 7. 在本條款中，詞彙 「包括」 指 「包括但不限於」。<br /> 8. 我們有權利在任何時間更改此條約而不做出任何公告。<br /> 9. 本網站保有一切最終解釋權利。",
//                 access_token: "CAAYJN4aj1KUBAK3ZAuH9IJUdNeyyClDyZBNPXYDDujRm4ay3mQMpnV55zVU57o5rA3ZAeWJVEqdQXeGR0LTxtDamojzRpwZAufe8ZCFALx4IdKvlx15k0r6ro7ffE63pbAWLZBacj6z0N3ohSJTJZBMjJeZAlL4WfVOmB98vfjv1INRG8tL8PAw9wU0TZAljS45MZD"
//             },

//             338773669580269: {
//                 siteName: "靠北餐廳",
//                 pageName: "靠北餐廳",
//                 hashtag: "#靠北餐廳",
//                 pageUrl: "https://www.facebook.com/%E9%9D%A0%E5%8C%97%E9%A4%90%E5%BB%B3-338773669580269",
//                 afterPost: "發文請至新系統 goo.gl/hG2Gk1 並遵守使用條款",
//                 postLabel: "你都在靠北些什麼？",
//                 postPlaceholder: "請勿包含違法內容及能夠辨識被靠北人身份、餐廳名稱的字眼。我們將會記錄您的 IP 位置及您的行為，請勿提交無關餐廳/服務業之貼文。如您不當地使用此網頁，必要時，我們有權利直接封鎖您的 IP 位置及使用者唯一辨識碼以阻止您使用此服務且我們將不會進行解鎖。感謝您的配合。",
//                 terms: "1. 管理員們每日縝密審查靠北貼文。如貼文內含有違反此條款之任何一項，管理員有權利依情況對貼文做出小幅度變更或選擇刪除該貼文而不做出任何提醒。必要時，我們有權利直接封鎖您的 IP 位置及使用者唯一辨識碼以阻止您使用此服務。<br /> 2. 靠北者之任何靠北內容不代表本粉絲專頁之觀點或立場。如有爭議，請私訊管理員。<br /> 3. 靠北者之任何靠北內容應不包含任何違反中華民國法律之規定。包括髒字、人身攻擊、洩露個資、廣告文、政治文、尋仇文、超短文、宣傳文、連結文、釣魚文、重複文及無意義之文章，均會遭到移除。<br /> 4. 靠北者之任何靠北內容應不冒充管理員做出任何公告。官方的公告均以粉絲專頁置頂文為準。<br /> 5. 在文章發佈後，我們不會依照使用者的要求刪除任何貼文。如該貼文有爭議請立即私訊我們以維護您的權益。<br /> 6. 若本條款的任何條款根據任何法律被整體或部分視為非法、無效或不可強制執行，此條款或相關部份應被視為不屬於本條款，本條款的餘下條文的合法性、有效性及可強制執行性應不受影響。<br /> 7. 在本條款中，詞彙 「包括」 指 「包括但不限於」。<br /> 8. 我們有權利在任何時間更改此條約而不做出任何公告。<br /> 9. 本網站保有一切最終解釋權利。",
//                 access_token: "CAAYJN4aj1KUBAEwWy9nJQqHJyUxYxTVPBQDLTcKZB25UtRzbebzyewI2O9ykCKptaQ2gPUXuC1VwX53ErERTdgh4UbutElh6ZAwjsW3XF0YZCNcsVLFuG3VKaTgO6i6HjEBPk96WrJEncsLEm4mud9ec1SzXapBdoatEqK4TTbDMTZBweoNBaB9IxtlZAZAfgZD"
//             }
//         },
//         system: {
//             lang: "en-US"
//         },
//         facebook: {
//             app_id: "1698983946998949",
//             app_secret: "4a8180a7ae65214e48845b7359016463"
//         },

//         googleRecaptcha: {
//             enabled: true,
//             gRsitekey: "6LeVoBITAAAAAMkGiC0tEdIMeq0Jg19ViOC9U2wI",
//             gRsecret: "6LeVoBITAAAAAAjlGf2o3FzGuyY5EKJGZiIQjp12"
//         },
//     };

//     core.db.main.insert(doc, function (err, newDoc) {
//         if (err) {
//             throw new Error("Failed initalizing the database: " + err);
//             return false;
//         }

//         console.log(newDoc)
//     });
// });


// core.db.main.find({}, function (err, docs) {
//     if (err || !docs[0]) {
//         throw new Error("Failed loading the database: " + err);
//         return false;
//     }

//     console.log(docs);
// });
