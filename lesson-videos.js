/* VOA Learning English Level 1 공식 강의의 HTML5 video 소스(360p/720p).
 * 원본: 각 레슨의 learningenglish.voanews.com <video data-sources>.
 * 외부 MP4 파일을 GitHub 저장소에 복제하지 않고 공식 CDN에서 스트리밍합니다.
 * 원본 페이지의 영상 주소가 변경되면 이 목록을 갱신해야 합니다. */
const LESSON_VIDEOS = [
  {
    "id": 1,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/5/5f/5f00c78a-0f84-41e6-949d-bd808bcadf50.mp4?cb=edc3e5eec",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/5/5f/5f00c78a-0f84-41e6-949d-bd808bcadf50_720p.mp4?cb=edc3e5eec",
    "poster": "https://gdb.voanews.com/1e57f8a7-bd44-47a3-9a67-e2527c65ff93_w1200_h630.jpg"
  },
  {
    "id": 2,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/4/42/4298a2ba-d665-4b1c-aaa1-502bbcb9b88d.mp4?cb=edc3e6218",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/4/42/4298a2ba-d665-4b1c-aaa1-502bbcb9b88d_720p.mp4?cb=edc3e6218",
    "poster": "https://gdb.voanews.com/12da8cda-b147-4168-ab4b-29e904b1a1cd_w1200_h630.jpg"
  },
  {
    "id": 3,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/0/02/027f8fdd-e9b0-409c-8618-45be49fcefe8.mp4?cb=ecfb9e14d",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/0/02/027f8fdd-e9b0-409c-8618-45be49fcefe8_hq.mp4?cb=ecfb9e14d",
    "poster": "https://gdb.voanews.com/3152256f-2e72-4825-8789-da8a46b6c55c_w1200_h630.jpg"
  },
  {
    "id": 4,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/c/c8/c829a13b-9764-4b89-ad70-1edbdc3d8013.mp4?cb=ecfb9e17b",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/c/c8/c829a13b-9764-4b89-ad70-1edbdc3d8013_hq.mp4?cb=ecfb9e17b",
    "poster": "https://gdb.voanews.com/3aed35a9-94a4-478c-9e26-8f57d30a4be2_w1200_h630.jpg"
  },
  {
    "id": 5,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/c/ce/ce630bdd-1ffd-4c63-aca7-4bdff50fc7ba.mp4?cb=ed0a575e6",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/c/ce/ce630bdd-1ffd-4c63-aca7-4bdff50fc7ba_hq.mp4?cb=ed0a575e6",
    "poster": "https://gdb.voanews.com/b519a7a9-6e70-4459-aeb7-26e8fc42315f_w1200_h630.jpg"
  },
  {
    "id": 6,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/1/17/17b61020-32a1-4021-9575-adbf9ee76979.mp4?cb=ecfb9e2bf",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/1/17/17b61020-32a1-4021-9575-adbf9ee76979_hq.mp4?cb=ecfb9e2bf",
    "poster": "https://gdb.voanews.com/9170d1a5-cfaa-4d11-82f1-830c5082ba14_w1200_h630.jpg"
  },
  {
    "id": 7,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/5/54/54ebe82e-9578-4c39-9ca9-42dae639be4f.mp4?cb=ecfb9e2d5",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/5/54/54ebe82e-9578-4c39-9ca9-42dae639be4f_hq.mp4?cb=ecfb9e2d5",
    "poster": "https://gdb.voanews.com/816bbc83-c5ad-469d-998c-4ed608051662_w1200_h630.jpg"
  },
  {
    "id": 8,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/e/ee/ee277d1c-017b-4b98-9491-8de08a76122e.mp4?cb=ecfb9e192",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/e/ee/ee277d1c-017b-4b98-9491-8de08a76122e_hq.mp4?cb=ecfb9e192",
    "poster": "https://gdb.voanews.com/064481fe-e5f5-4a71-8862-49d0b4edf16f_w1200_h630.jpg"
  },
  {
    "id": 9,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/4/44/44b5b429-02aa-45c0-ac5a-cde704945b4b.mp4?cb=ecfb9e1a6",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/4/44/44b5b429-02aa-45c0-ac5a-cde704945b4b_hq.mp4?cb=ecfb9e1a6",
    "poster": "https://gdb.voanews.com/683ebde2-f1ed-47bb-a5a7-09bcc34191bb_w1200_h630.jpg"
  },
  {
    "id": 10,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/06/3/3e/3ec2bbef-f064-4545-bbdd-74f2a695e141.mp4?cb=ecfb9e2ea",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/06/3/3e/3ec2bbef-f064-4545-bbdd-74f2a695e141_hq.mp4?cb=ecfb9e2ea",
    "poster": "https://gdb.voanews.com/07d1c689-ceaf-45af-9ff6-a36850705a6c_w1200_h630.jpg"
  },
  {
    "id": 11,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/9/93/932ae001-a462-4158-8e25-399289a46ec9.mp4?cb=ecfb9e1b9",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/9/93/932ae001-a462-4158-8e25-399289a46ec9_hq.mp4?cb=ecfb9e1b9",
    "poster": "https://gdb.voanews.com/1ad61aed-9d02-4ed8-879d-8007381309b3_w1200_h630.jpg"
  },
  {
    "id": 12,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/6/67/671fbaf2-668e-49a3-9828-a0639d1ce3d5.mp4?cb=ecfb9e304",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/05/6/67/671fbaf2-668e-49a3-9828-a0639d1ce3d5_hq.mp4?cb=ecfb9e304",
    "poster": "https://gdb.voanews.com/73f835e2-1646-48c6-8f08-243d94490df0_w1200_h630.jpg"
  },
  {
    "id": 13,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/7/73/73103ed5-8133-4a1a-9219-cfef86973f25.mp4?cb=edc3fa7ae",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/7/73/73103ed5-8133-4a1a-9219-cfef86973f25_720p.mp4?cb=edc3fa7ae",
    "poster": "https://gdb.voanews.com/383e3ae9-fbcf-47f7-b0fe-ddabc0dc83ab_w1200_h630.jpg"
  },
  {
    "id": 14,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/3/3d/3d8d63a8-2984-4469-9737-d34b0d519506.mp4?cb=edc3fa9f5",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/3/3d/3d8d63a8-2984-4469-9737-d34b0d519506_720p.mp4?cb=edc3fa9f5",
    "poster": "https://gdb.voanews.com/b722148d-cfe3-4925-bebc-5e4118efad65_w1200_h630.jpg"
  },
  {
    "id": 15,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/b/b0/b07eac5a-cc3a-4f3e-821c-ecae337b5415.mp4?cb=edc3fab67",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/b/b0/b07eac5a-cc3a-4f3e-821c-ecae337b5415_720p.mp4?cb=edc3fab67",
    "poster": "https://gdb.voanews.com/900367b3-8b74-40ef-a506-022d45732047_cx0_cy1_cw99_w1200_h630.png"
  },
  {
    "id": 16,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/d/dd/ddc153c2-e1b2-4d09-b8ba-67172e1f88fe.mp4?cb=edc3faf05",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/d/dd/ddc153c2-e1b2-4d09-b8ba-67172e1f88fe_720p.mp4?cb=edc3faf05",
    "poster": "https://gdb.voanews.com/dc044df8-8a73-442d-a994-09165bd45921_w1200_h630.jpg"
  },
  {
    "id": 17,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/f/fb/fbb85647-eaa9-4ca4-801e-c4c085593d89.mp4?cb=edc3fb114",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/f/fb/fbb85647-eaa9-4ca4-801e-c4c085593d89_720p.mp4?cb=edc3fb114",
    "poster": "https://gdb.voanews.com/ec143400-d318-45c4-afe3-1bf8c5ceddee_w1200_h630.png"
  },
  {
    "id": 18,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/a/aa/aa81937e-fc02-4d62-9f34-e8b432538615.mp4?cb=edc3fb36f",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/a/aa/aa81937e-fc02-4d62-9f34-e8b432538615_720p.mp4?cb=edc3fb36f",
    "poster": "https://gdb.voanews.com/d94f63f2-9588-4caf-8143-03c257dc0357_w1200_h630.jpg"
  },
  {
    "id": 19,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/8/87/87817c7f-1ceb-47ae-9e56-c90081179223.mp4?cb=edc3fb68f",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/8/87/87817c7f-1ceb-47ae-9e56-c90081179223_720p.mp4?cb=edc3fb68f",
    "poster": "https://gdb.voanews.com/1079041f-ec0f-400b-8820-d2141f231572_w1200_h630.jpg"
  },
  {
    "id": 20,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/06/5/5d/5d078c81-3fa1-4101-9d0f-9cbab2c671ce.mp4?cb=ecfb9e1dc",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/06/5/5d/5d078c81-3fa1-4101-9d0f-9cbab2c671ce_hq.mp4?cb=ecfb9e1dc",
    "poster": "https://gdb.voanews.com/4651f7b6-ab85-415a-b7e1-64f9c8460c9b_w1200_h630.jpg"
  },
  {
    "id": 21,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/3/38/38946ff6-eee8-4acc-a3fc-759121fd6313.mp4?cb=edc3fbab8",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/3/38/38946ff6-eee8-4acc-a3fc-759121fd6313_720p.mp4?cb=edc3fbab8",
    "poster": "https://gdb.voanews.com/fa886630-938a-422f-b266-ac53c8652a78_w1200_h630.jpg"
  },
  {
    "id": 22,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/6/6f/6f09d624-a8a7-4ce8-a972-1a7bfed06679.mp4?cb=edc3fc2cc",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/6/6f/6f09d624-a8a7-4ce8-a972-1a7bfed06679_720p.mp4?cb=edc3fc2cc",
    "poster": "https://gdb.voanews.com/688c98d4-736c-4b85-a56d-47499ca1da91_w1200_h630.jpg"
  },
  {
    "id": 23,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/e/e7/e7759765-b3e3-4624-a927-0cc2326eb311.mp4?cb=edc3fc3cf",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/e/e7/e7759765-b3e3-4624-a927-0cc2326eb311_720p.mp4?cb=edc3fc3cf",
    "poster": "https://gdb.voanews.com/b621f099-4447-4736-906c-74723bef081b_cx13_cy2_cw87_w1200_h630.jpg"
  },
  {
    "id": 24,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/2/24/240be8a1-701d-4fd2-b6f0-5fa9dda5d188.mp4?cb=edc3fc52e",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/2/24/240be8a1-701d-4fd2-b6f0-5fa9dda5d188_720p.mp4?cb=edc3fc52e",
    "poster": "https://gdb.voanews.com/5b96ad6a-784a-45dd-8186-9a714faad2b1_w1200_h630.jpg"
  },
  {
    "id": 25,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/3/35/35095de1-0ff5-48bf-815c-5dab66a55a2f.mp4?cb=edc3fc754",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/3/35/35095de1-0ff5-48bf-815c-5dab66a55a2f_720p.mp4?cb=edc3fc754",
    "poster": "https://gdb.voanews.com/1ff1bd55-2db8-4c13-88b6-9f21af5ea607_w1200_h630.jpg"
  },
  {
    "id": 26,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/b/b9/b9ddf673-07ec-4557-b33d-37cf6315e3e3.mp4?cb=edc3fc9d6",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/b/b9/b9ddf673-07ec-4557-b33d-37cf6315e3e3_720p.mp4?cb=edc3fc9d6",
    "poster": "https://gdb.voanews.com/4e98970e-2c12-427b-9f94-c28cf8f9568e_w1200_h630.jpg"
  },
  {
    "id": 27,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/0/00/0025af70-3442-45fb-8417-f12d5592761a.mp4?cb=edc3fcb90",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/0/00/0025af70-3442-45fb-8417-f12d5592761a_720p.mp4?cb=edc3fcb90",
    "poster": "https://gdb.voanews.com/44773512-7487-4382-8565-04fc7359fbed_w1200_h630.jpg"
  },
  {
    "id": 28,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/d/d2/d2a1c2bf-0655-4eab-b4dc-60e15cd64ed9.mp4?cb=edc3fcd85",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/d/d2/d2a1c2bf-0655-4eab-b4dc-60e15cd64ed9_720p.mp4?cb=edc3fcd85",
    "poster": "https://gdb.voanews.com/b471b108-bd0e-4bd5-a259-800092f32271_w1200_h630.jpg"
  },
  {
    "id": 29,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/4/44/4448c192-ea38-4ddd-a68b-dc1adf515180.mp4?cb=edc3fcffb",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/4/44/4448c192-ea38-4ddd-a68b-dc1adf515180_720p.mp4?cb=edc3fcffb",
    "poster": "https://gdb.voanews.com/c160d09a-232f-4d88-89e6-ac8f755688ea_w1200_h630.jpg"
  },
  {
    "id": 30,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/c/cc/cc4d97ac-b23a-4c71-a915-205f1bac86fc.mp4?cb=edc40d53c",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/c/cc/cc4d97ac-b23a-4c71-a915-205f1bac86fc_720p.mp4?cb=edc40d53c",
    "poster": "https://gdb.voanews.com/0a5cbb57-0fba-445d-a902-b47345ffb4c5_w1200_h630.jpg"
  },
  {
    "id": 31,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/2/2f/2f34a0bc-9aad-45d3-b918-748706bad539.mp4?cb=edc40d617",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/2/2f/2f34a0bc-9aad-45d3-b918-748706bad539_720p.mp4?cb=edc40d617",
    "poster": "https://gdb.voanews.com/bfb5c3f8-6024-4d19-94f7-d1bf4e2d2363_w1200_h630.jpg"
  },
  {
    "id": 32,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/8/8e/8e1a9678-e224-4d51-b9ac-fa05d9991d16.mp4?cb=edc40d74a",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/8/8e/8e1a9678-e224-4d51-b9ac-fa05d9991d16_720p.mp4?cb=edc40d74a",
    "poster": "https://gdb.voanews.com/8110b26e-95c5-4e36-b947-12646f1b3fd2_w1200_h630.jpg"
  },
  {
    "id": 33,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/0/0c/0c930ce2-1638-4d5d-a528-a4390e235a16.mp4?cb=edc40d992",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/0/0c/0c930ce2-1638-4d5d-a528-a4390e235a16_720p.mp4?cb=edc40d992",
    "poster": "https://gdb.voanews.com/76fd24b1-af74-4523-9a19-1f73f56c330e_w1200_h630.jpg"
  },
  {
    "id": 34,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/10/5/58/58320812-fc3c-4304-9a00-f2a54f99bc1a.mp4?cb=edc40e3aa",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2016/10/5/58/58320812-fc3c-4304-9a00-f2a54f99bc1a_hq.mp4?cb=edc40e3aa",
    "poster": "https://gdb.voanews.com/1a3f9e05-fbf7-4dd7-8867-0bcbe4455071_w1200_h630.jpg"
  },
  {
    "id": 35,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/9/96/961080a9-4397-411e-a79f-dfa874e4c5ca.mp4?cb=edc43ab4c",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/9/96/961080a9-4397-411e-a79f-dfa874e4c5ca_720p.mp4?cb=edc43ab4c",
    "poster": "https://gdb.voanews.com/b50f4543-a480-4d3a-a600-0759323cb59c_w1200_h630.jpg"
  },
  {
    "id": 36,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/6/6f/6f867a3f-a8f1-4a89-b18c-892f85e60d35.mp4?cb=edc43ad5a",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/6/6f/6f867a3f-a8f1-4a89-b18c-892f85e60d35_720p.mp4?cb=edc43ad5a",
    "poster": "https://gdb.voanews.com/1f535d7a-8ac9-408d-8983-9940782cd296_w1200_h630.jpg"
  },
  {
    "id": 37,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/4/46/4619beb2-18dd-45cb-a55a-42989d3beeec.mp4?cb=edc43aeeb",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/4/46/4619beb2-18dd-45cb-a55a-42989d3beeec_720p.mp4?cb=edc43aeeb",
    "poster": "https://gdb.voanews.com/0b12980b-967a-44c5-b3d6-3251167cd8bd_w1200_h630.jpg"
  },
  {
    "id": 38,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/1/1d/1d74e0d6-82c0-4782-bebd-e5bbd65a8057.mp4?cb=edc43b190",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/1/1d/1d74e0d6-82c0-4782-bebd-e5bbd65a8057_720p.mp4?cb=edc43b190",
    "poster": "https://gdb.voanews.com/de96c7c5-06d3-4dcf-b84c-5d74f5af6632_w1200_h630.jpg"
  },
  {
    "id": 39,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/0/08/088b68c0-58b8-46dc-9796-d6c542e3d44e.mp4?cb=edc43b603",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/0/08/088b68c0-58b8-46dc-9796-d6c542e3d44e_720p.mp4?cb=edc43b603",
    "poster": "https://gdb.voanews.com/7b654eae-13d8-440a-bf76-13f2a0798853_w1200_h630.jpg"
  },
  {
    "id": 40,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/a/ac/ac4d5f85-718e-433f-a4e6-989e842db20a.mp4?cb=edc43b8b5",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/a/ac/ac4d5f85-718e-433f-a4e6-989e842db20a_720p.mp4?cb=edc43b8b5",
    "poster": "https://gdb.voanews.com/f8922642-0fd5-457b-bdca-bb52e8f5ab9b_w1200_h630.jpg"
  },
  {
    "id": 41,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/b/bb/bb252e9e-dc85-4281-9e24-133f65290c88.mp4?cb=edc43bac9",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/b/bb/bb252e9e-dc85-4281-9e24-133f65290c88_720p.mp4?cb=edc43bac9",
    "poster": "https://gdb.voanews.com/e6f0d328-a9a5-4c1a-bd9d-f061bf702042_w1200_h630.png"
  },
  {
    "id": 42,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/e/e7/e7e1cf42-37e1-440d-b1fa-de80ec67283d.mp4?cb=edc43be94",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/e/e7/e7e1cf42-37e1-440d-b1fa-de80ec67283d_720p.mp4?cb=edc43be94",
    "poster": "https://gdb.voanews.com/824b606c-4327-43e7-90a5-a8fdf7e20870_w1200_h630.jpg"
  },
  {
    "id": 43,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/9/9b/9b044a43-6f81-4c9d-9724-f48a5e1a6da7.mp4?cb=edc47a5ce",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/9/9b/9b044a43-6f81-4c9d-9724-f48a5e1a6da7_720p.mp4?cb=edc47a5ce",
    "poster": "https://gdb.voanews.com/33274b8c-0f6d-46e9-8111-09b7e27bf7e1_w1200_h630.jpg"
  },
  {
    "id": 44,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/1/1b/1b5c7537-8259-49ea-870c-abec2a1b94d1.mp4?cb=edc47a83a",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/1/1b/1b5c7537-8259-49ea-870c-abec2a1b94d1_720p.mp4?cb=edc47a83a",
    "poster": "https://gdb.voanews.com/d72975ce-2aa4-4f24-83eb-e95de94e5335_w1200_h630.png"
  },
  {
    "id": 45,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/6/64/646ddd6d-a051-4cd9-b694-21a0f69a073a.mp4?cb=edc47a9cd",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/6/64/646ddd6d-a051-4cd9-b694-21a0f69a073a_720p.mp4?cb=edc47a9cd",
    "poster": "https://gdb.voanews.com/874b3da7-d5ab-430f-a9d5-bddd66f194c4_w1200_h630.jpg"
  },
  {
    "id": 46,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/1/13/13db3058-03d4-44b8-910e-d344aa823b34.mp4?cb=edc47aa9c",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/1/13/13db3058-03d4-44b8-910e-d344aa823b34_720p.mp4?cb=edc47aa9c",
    "poster": "https://gdb.voanews.com/9aaa0997-fa4c-4f68-a521-596e74bbee6c_w1200_h630.jpg"
  },
  {
    "id": 47,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/5/5c/5cb0595a-5299-4b58-bdcc-b8541b468cf3.mp4?cb=edc47abcb",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/5/5c/5cb0595a-5299-4b58-bdcc-b8541b468cf3_720p.mp4?cb=edc47abcb",
    "poster": "https://gdb.voanews.com/ebbc4a86-b4b9-4096-b8dc-d94021fdd4db_w1200_h630.jpg"
  },
  {
    "id": 48,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/0/0a/0a211e31-97d1-4192-b60d-4de9a153000e.mp4?cb=edc47acee",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/0/0a/0a211e31-97d1-4192-b60d-4de9a153000e_720p.mp4?cb=edc47acee",
    "poster": "https://gdb.voanews.com/e41989e1-6812-40a5-a030-dddfe0f05ac3_w1200_h630.jpg"
  },
  {
    "id": 49,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/a/a4/a49eae09-d90d-4d8e-a62c-0a718b8f32be.mp4?cb=edc47ae38",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/a/a4/a49eae09-d90d-4d8e-a62c-0a718b8f32be_720p.mp4?cb=edc47ae38",
    "poster": "https://gdb.voanews.com/439e3d2b-ff0a-4bd0-9f7a-eb3fd4442375_w1200_h630.jpg"
  },
  {
    "id": 50,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/b/b7/b76551c9-f6b7-4a36-b8b8-013060087617.mp4?cb=edc47b045",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/b/b7/b76551c9-f6b7-4a36-b8b8-013060087617_720p.mp4?cb=edc47b045",
    "poster": "https://gdb.voanews.com/58859cab-5ebc-4bd9-82d2-bdd8f6be82c5_w1200_h630.png"
  },
  {
    "id": 51,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/8/89/89e2abe4-1e50-4a83-b771-b3623fffb590.mp4?cb=edc47b17c",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/8/89/89e2abe4-1e50-4a83-b771-b3623fffb590_720p.mp4?cb=edc47b17c",
    "poster": "https://gdb.voanews.com/26cab0b6-f946-49c4-a33a-2168e0577101_w1200_h630.jpg"
  },
  {
    "id": 52,
    "sd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/6/6d/6dfd5f69-746e-45bd-86b1-1dba49c23a48.mp4?cb=edc47b2ba",
    "hd": "https://voa-video-ns.akamaized.net/pangeavideo/2021/02/6/6d/6dfd5f69-746e-45bd-86b1-1dba49c23a48_720p.mp4?cb=edc47b2ba",
    "poster": "https://gdb.voanews.com/bf617f89-c9ce-4355-a1b0-1a1bd76a6732_w1200_h630.jpg"
  }
];
