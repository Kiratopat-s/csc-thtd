properly plan to implement the dashboard page to render the table lists for the summary each row and leave that name for judge to edit and save it each row.
one row or record will contain 3 part of it data
1.'TASK' sheet `Timestamp	รูปงาน 6 มุม	จุดต่อแน่นมั้ย
9/4/2026 14:01:17	https://drive.google.com/open?id=1J171E6henhMpCsH1KArJyCiqkfmBAu-U, https://drive.google.com/open?id=1BgqdTMLtxSNEwKet1F5jvsaHxcA77llb, https://drive.google.com/open?id=1btf6prwwJpo5xWoO199UZxMRCJXe3DTU	แน่น` จุดต่อแน่นมั้ย ตอบได้ทั้ง [แน่น,ไม่แน่น]

```form
รูปงาน 6 มุม
*
Upload up to 10 supported files. Max 10 MB per file.

จุดต่อแน่นมั้ย
*
แน่น
ไม่แน่น
```

2.'TOOL' sheet `Timestamp	รูปจุดวางเครื่องมือ	เก็บเข้าที่เดิมเรียบร้อยมั้ย
9/4/2026 14:01:41	https://drive.google.com/open?id=1ObRIjRhAXet0M-RccoxK22tu6wJb3XVj	เรียบร้อย` เก็บเข้าที่เดิมเรียบร้อยมั้ย [เรียบร้อย,ไม่เรียบร้อย,ของหาย]

```form
รูปจุดวางเครื่องมือ
*
Upload up to 10 supported files. Max 10 MB per file.

เก็บเข้าที่เดิมเรียบร้อยมั้ย
*
เรียบร้อย
ไม่เรียบร้อย
ของหาย

```

3.'VEHICLE' sheet `Timestamp	รูป Boom บน	Boom บน เก็บสนิทมั้ย	รูป Boom ล่าง	Boom ล่าง เก็บสนิทมั้ย	รูป ใต้ใบกระเช้า	ใบกระเช้า นั่งสนิทมั้ย	รูป Lock ใบกระเช้า	Lock เครนกระเช้ามั้ย
9/4/2026 14:00:08	https://drive.google.com/open?id=1o7ZFcbXMz4pFEG74ddebEu7a_90lawX7	สนิท	https://drive.google.com/open?id=1jesm8KiKGaDBjEbu7VpbtZrN__bJ9eLi	ไม่สนิท	https://drive.google.com/open?id=1obNjTLAaIeRQbuQIHgmKM3wQlid8T4r-	สนิท	https://drive.google.com/open?id=1caD5JepXPyGHytKnNvj4acyB_BI1ZntS	ลืม Lock`

````form
รูป Boom บน
*
Upload 1 supported file. Max 100 MB.

Boom บน เก็บสนิทมั้ย
*
สนิท
ไม่สนิท

รูป Boom ล่าง
*
Upload 1 supported file. Max 100 MB.

Boom ล่าง เก็บสนิทมั้ย
*
สนิท
ไม่สนิท

รูป ใต้ใบกระเช้า
*
Upload 1 supported file. Max 100 MB.

ใบกระเช้า นั่งสนิทมั้ย
*
สนิท
ไม่สนิท

รูป Lock ใบกระเช้า
*
Upload 1 supported file. Max 100 MB.

Lock เครนกระเช้ามั้ย
*
Lock
ลืม Lock```
````

the main dashboard should have a status for each part of data has been fill up on each sheet yet. show as waiting/submited in (you. can use icon).
each row must have a lookup button that can click to browse more details from that row number.
on the detail page must render each sheet into each section on web ui for judge to looking all the details of that sheets of same row number as a one report entity.
the text must show and use the icon properly of that text meaning. the images must able to render on the web page (use skelleton and lazy load for other information paint first). one single header can have many images so web app must properly handle render ui of images.
