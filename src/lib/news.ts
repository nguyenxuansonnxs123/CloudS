import type { Locale } from "./locale";

export type NewsListItem = { title?: string; text: string; image?: string };
export type NewsGalleryImage = { src: string; alt: string; credit?: string };

export type NewsBlock =
  | { type: "paragraph"; text: string; links?: { text: string; href: string }[] }
  | { type: "heading"; level?: 2 | 3; text: string }
  | { type: "note"; text: string }
  | { type: "list"; items: NewsListItem[] }
  | { type: "gallery"; images: NewsGalleryImage[]; credit?: string };

export type NewsPost = {
  slug: string;
  /** ISO date, vd "2026-08-27" */
  date: string;
  coverImage?: string;
  translations: {
    vi: { title: string; excerpt: string; content: NewsBlock[] };
    en: { title: string; excerpt: string; content: NewsBlock[] };
  };
};

// Thêm bài mới bằng cách thêm phần tử vào mảng này (mới nhất để đầu mảng).
export const newsPosts: NewsPost[] = [
  {
    slug: "ha-noi-thang-9-su-kien-am-thuc",
    date: "2026-09-02",
    coverImage: "/images/news/ho-tay-chieu-hoang-hon.webp",
    translations: {
      vi: {
        title: "Hà Nội Tháng 9: Lễ Hội, Quán Ngon Và Gợi Ý Sống Chất",
        excerpt:
          "Festival Thăng Long – Hà Nội, loạt quán ăn đáng thử cả nổi tiếng lẫn bí mật, hoạt động ngoài trời và gợi ý chỗ ở — trọn bộ cẩm nang cho một tháng 9 đẹp tại Hà Nội.",
        content: [
          {
            type: "paragraph",
            text: "Tháng 9 này, Hà Nội bước vào mùa thu với không khí rộn ràng của lễ hội văn hóa, một làn sóng quán cà phê – ẩm thực mới đang \"làm mưa làm gió\" trên mạng xã hội, và vô vàn lý do để bạn xách máy ảnh xuống phố. Dưới đây là những cập nhật đáng chú ý nhất, cùng vài gợi ý nhỏ để bạn tận hưởng trọn vẹn mùa thu Hà Nội.",
          },
          {
            type: "gallery",
            images: [
              { src: "/images/news/ho-tay-chieu-hoang-hon.webp", alt: "Hoàng hôn Hồ Tây, bóng chùa Trấn Quốc" },
              { src: "/images/news/ho-tay-hoang-hon.webp", alt: "Hoàng hôn rực rỡ trên Hồ Tây" },
              { src: "/images/news/ho-tay-cay-ven-ho.webp", alt: "Hồ Tây lúc hoàng hôn, cây ven hồ" },
            ],
            credit: "Ảnh: NKSTTSSHNVN, Rungbachduong — Wikimedia Commons (CC BY-SA)",
          },
          { type: "heading", level: 2, text: "1. Sự kiện nổi bật trong tháng" },
          { type: "heading", level: 3, text: "Festival Thăng Long – Hà Nội lần thứ II năm 2026" },
          {
            type: "paragraph",
            text: "Đây chắc chắn là sự kiện văn hóa lớn nhất tháng 9 tại Thủ đô. Với chủ đề \"Dòng chảy di sản – Heritage Flow\", festival năm nay bước sang mùa tổ chức thứ hai, mở rộng quy mô và trải dài qua nhiều không gian di sản tiêu biểu.",
          },
          {
            type: "list",
            items: [
              { title: "Thời gian", text: "11/9 – 20/9/2026" },
              {
                title: "Địa điểm",
                text: "Hoàng thành Thăng Long, Văn Miếu – Quốc Tử Giám, Bảo tàng Hà Nội, Quảng trường Đông Kinh Nghĩa Thục và làng gốm Bát Tràng",
              },
              {
                title: "Điểm đặc biệt",
                text: "Hành trình trải nghiệm xuyên suốt nhiều địa điểm thay vì chỉ một sân khấu cố định — mỗi nơi giữ một câu chuyện riêng, từ di sản gặp công nghệ đến làng nghề tạo ra âm thanh.",
              },
            ],
          },
          {
            type: "gallery",
            images: [
              { src: "/images/news/hoang-thanh-thang-long.webp", alt: "Đoan Môn, Hoàng thành Thăng Long" },
              { src: "/images/news/van-mieu.webp", alt: "Khuê Văn Các, Văn Miếu – Quốc Tử Giám" },
              { src: "/images/news/bao-tang-ha-noi.webp", alt: "Bảo tàng Hà Nội" },
              { src: "/images/news/dong-kinh-nghia-thuc.webp", alt: "Khu vực Hồ Gươm về đêm, gần Quảng trường Đông Kinh Nghĩa Thục" },
              { src: "/images/news/bat-trang.webp", alt: "Làng gốm Bát Tràng" },
            ],
            credit:
              "Ảnh: Phan Minh Tuấn, Edgardo W. Olivera, Grenouille vert, Adam Jones, Steven C. Price — Wikimedia Commons (CC BY-SA)",
          },
          {
            type: "note",
            text: "Đây là dịp lý tưởng để giới thiệu khách thuê ngắn hạn hoặc khách quốc tế đang lưu trú tại Hà Nội về trải nghiệm văn hóa bản địa.",
          },
          { type: "heading", level: 3, text: "Các triển lãm – hội chợ thương mại" },
          {
            type: "paragraph",
            text: "Bên cạnh các hoạt động văn hóa, Hà Nội cũng là điểm đến của nhiều triển lãm chuyên ngành trong tháng, phù hợp với nhóm khách công tác, khách doanh nghiệp. Phần lớn diễn ra ngày 9–11/9/2026 tại Trung tâm Triển lãm Quốc tế VEC (Đông Anh, Hà Nội):",
          },
          {
            type: "list",
            items: [
              { text: "VIOE 2026 — Triển lãm quốc tế Quang điện tử Việt Nam" },
              { text: "Automation World Vietnam — Triển lãm Tự động hóa thế giới" },
              { text: "VIIF 2026 — Hội chợ Quốc tế Hàng Công nghiệp Việt Nam" },
              { text: "HE EXPO — Triển lãm Ngũ kim, Dụng cụ cầm tay, Ốc vít và Thiết bị cơ điện" },
              { text: "Wire & Cable Show Vietnam — Triển lãm Quốc tế Thiết bị điện, Dây và Cáp điện" },
            ],
          },
          { type: "heading", level: 2, text: "2. Ẩm thực & đồ uống đáng thử" },
          {
            type: "paragraph",
            text: "Vì phần lớn độc giả của chúng tôi là khách du lịch nước ngoài, danh sách dưới đây được chia làm hai nhóm: những quán đã \"nổi tiếng thế giới\" trong giới du lịch, và những quán \"chuẩn gu người Hà Nội\" mà khách Tây ít khi biết tới — dành cho ai muốn có trải nghiệm sâu hơn.",
          },
          { type: "heading", level: 3, text: "Nhóm 1 — Quán quen thuộc với khách du lịch" },
          {
            type: "paragraph",
            text: "Đây là những địa chỉ hầu như xuất hiện trong mọi cẩm nang du lịch Hà Nội — dễ tìm, dễ đặt bàn, phù hợp cho ngày đầu mới đến:",
          },
          {
            type: "list",
            items: [
              {
                title: "Bún chả Hương Liên (\"Bún chả Obama\")",
                text: "Món bún chả từng được cựu Tổng thống Mỹ Barack Obama thưởng thức cùng đầu bếp Anthony Bourdain năm 2016, nay được vinh danh trong Michelin Guide. 24 Lê Văn Hưu, Hai Bà Trưng, Hà Nội.",
                image: "/images/news/bun-cha-huong-lien.webp",
              },
              {
                title: "Cà phê Giang",
                text: "Nơi khai sinh món cà phê trứng (egg coffee) trứ danh của Hà Nội từ năm 1946. Nằm sâu trong ngõ nhỏ, tìm tường vàng bạc màu và biển gỗ. 39 Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội.",
                image: "/images/news/ca-phe-giang.webp",
              },
              {
                title: "Bánh Mì 25",
                text: "Bánh mì kiểu Việt đúng chuẩn, giá hợp lý, không gian thân thiện với người mới đến. 25 Hàng Cá, Hoàn Kiếm, Hà Nội.",
              },
              {
                title: "Hanoi Social Club",
                text: "Quán cà phê kiêm không gian sáng tạo trong ngõ nhỏ, được nhiều khách quốc tế yêu thích nhờ không khí ấm cúng, thực đơn đa dạng. 6 Ngõ Hội Vũ, Hoàn Kiếm, Hà Nội.",
              },
              {
                title: "Phố Tạ Hiện (\"Beer Corner\")",
                text: "Dãy quán bar sát nhau, điểm giao lưu quen thuộc của khách balo và dân phượt buổi tối. Phố Tạ Hiện, Hoàn Kiếm, Hà Nội.",
              },
            ],
          },
          { type: "heading", level: 3, text: "Nhóm 2 — Quán \"chuẩn local\", khách du lịch ít biết" },
          {
            type: "paragraph",
            text: "Nếu bạn muốn gợi ý cho khách những trải nghiệm khác biệt hơn, tránh xa lối mòn du lịch, đây là vài cái tên đáng thử — thường nằm sâu trong ngõ, không biển hiệu nổi bật nhưng được người Hà Nội tin dùng:",
          },
          {
            type: "list",
            items: [
              {
                title: "Phở Gà Nguyệt",
                text: "Phở gà nổi tiếng trong giới sành ăn địa phương, được Michelin Guide khen suốt 4 năm liền, gần Hồ Hoàn Kiếm nhưng vẫn giữ không khí quán ăn đường phố đúng chất. 5B Phủ Doãn, Hàng Trống, Hoàn Kiếm, Hà Nội.",
                image: "/images/news/pho-ga-nguyet.webp",
              },
              {
                title: "Tranquil Books & Coffee",
                text: "Quán cà phê sách yên tĩnh, không gian bookish, phù hợp cho những ai muốn \"chậm lại\" giữa lịch trình du lịch dày đặc. Số 5 Nguyễn Quang Bích, Hoàn Kiếm, Hà Nội.",
              },
              {
                title: "Habakuk Fine Coffee & Bistro",
                text: "Mang hơi hướng hiện đại, sáng tạo nhưng vẫn giữ giá cả dễ tiếp cận, ít xuất hiện trên các app du lịch phổ biến. 4 Phan Huy Chú, Hoàn Kiếm, Hà Nội.",
                image: "/images/news/habakuk.webp",
              },
              {
                title: "MÀU Gastro Wine Bar",
                text: "Không gian 2 tầng hiện đại, ấm cúng, gần khu Văn Miếu — Quốc Tử Giám, một trong các điểm diễn ra Festival Thăng Long. 5 Văn Miếu, Đống Đa, Hà Nội.",
              },
              {
                title: "Hidden Pub Hanoi",
                text: "Quán bar không biển hiệu, phải để ý chuông cửa màu đỏ mới tìm ra, đúng chất \"secret bar\" được dân địa phương và khách sành truyền tai nhau. Phố Tạ Hiện, Hoàn Kiếm, Hà Nội.",
              },
            ],
          },
          {
            type: "note",
            text: "Mẹo nhỏ: phần lớn các quán \"local\" nằm trong ngõ nhỏ, khó tra trên Google Maps bằng tên tiếng Việt — nên lưu sẵn tên quán bằng tiếng Anh hoặc ghim vị trí trước khi đi.",
          },
          { type: "heading", level: 2, text: "3. Hoạt động ngoài trời" },
          {
            type: "paragraph",
            text: "Ngoài ăn uống và check-in quán xá, tháng 9 với thời tiết mát mẻ cũng là thời điểm lý tưởng để vận động ngoài trời. Một vài gợi ý phù hợp với khách đang lưu trú ngắn ngày tại Hà Nội:",
          },
          {
            type: "list",
            items: [
              {
                title: "Đạp xe quanh Phố cổ và cầu Long Biên",
                text: "Tour đạp xe buổi sáng dọc sông Hồng, qua các khu chợ dân sinh và làng ven đô, mang lại trải nghiệm gần gũi hơn với đời sống địa phương.",
              },
              {
                title: "Cyclo Tour kết hợp cà phê trứng",
                text: "Dạo quanh 36 phố phường bằng xích lô rồi dừng chân thưởng thức cà phê trứng — phù hợp cho khách muốn khám phá nhẹ nhàng, ít vận động.",
              },
              {
                title: "Đi bộ/chạy bộ quanh Hồ Gươm và Hồ Tây",
                text: "Buổi sáng sớm quanh hai hồ luôn có người dân tập thể dục, thái cực quyền — đây cũng là khung giờ đẹp nhất để chụp ảnh.",
              },
              {
                title: "Tour xe máy Vespa buổi chiều",
                text: "Khám phá ngoại thành và di tích Cổ Loa, phù hợp với khách thích trải nghiệm tốc độ và ít đi theo lối mòn.",
              },
              {
                title: "Day trip Ninh Bình (Tràng An – Tam Cốc – Hang Múa)",
                text: "Tour trong ngày kết hợp chèo thuyền ngắm hang động, đạp xe qua làng quê và leo núi ngắm toàn cảnh — rất hợp nếu chỉ có 1 ngày rảnh ngoài lịch trình ở Hà Nội.",
              },
              {
                title: "Lớp học nấu ăn hoặc tour ẩm thực đường phố có hướng dẫn viên",
                text: "Kết hợp vận động nhẹ với trải nghiệm văn hóa ẩm thực.",
              },
            ],
          },
          { type: "heading", level: 2, text: "4. Gợi ý chỗ ở tại Hà Nội" },
          {
            type: "paragraph",
            text: "Nếu bạn đang tìm một nơi lưu trú tại khu vực Tây Hồ để tiện ghé các quán cà phê hot vừa nhắc ở trên và tham gia trọn vẹn không khí Festival Thăng Long – Hà Nội, Four Season Serenity tại 53E, Ngõ 31 Xuân Diệu là một gợi ý đáng cân nhắc.",
            links: [{ text: "Xem chi tiết SD Housing (Four Season Serenity)", href: "/sd-housing" }],
          },
          {
            type: "list",
            items: [
              {
                title: "Vị trí",
                text: "53E, Ngõ 31 Xuân Diệu — ngay khu vực Tây Hồ, gần loạt quán cà phê check-in đang hot và các không gian văn hóa trung tâm.",
              },
              {
                title: "Phù hợp lưu trú ngắn ngày",
                text: "Lý tưởng cho khách du lịch, khách công tác muốn trải nghiệm Hà Nội theo nhịp sống \"local\".",
              },
              {
                title: "Không gian yên tĩnh, riêng tư",
                text: "Điểm dừng chân thoải mái sau một ngày dạo phố, check-in và tham quan lễ hội.",
              },
            ],
          },
          {
            type: "note",
            text: "Liên hệ với chúng tôi để được tư vấn phòng trống và ưu đãi đặt phòng trong mùa lễ hội tháng 9.",

          },
          { type: "heading", level: 2, text: "5. Vài gợi ý nhỏ khi xuống phố" },
          {
            type: "paragraph",
            text: "Mùa này lịch trình khá dày: sáng cà phê, chiều dạo Festival, tối lại di chuyển liên tục giữa các điểm check-in. Một đôi giày êm chân, dễ phối đồ sẽ giúp cả ngày rong ruổi nhẹ nhàng hơn hẳn — đó cũng là lý do nhiều bạn trẻ Hà Nội đang chọn các mẫu giày tối giản, êm nhẹ như của CloudS để đồng hành trong những ngày này, vừa hợp street style vừa đủ thoải mái để đi bộ cả ngày mà không mỏi chân. Vài mẫu đáng thử:",
            links: [
              { text: "CloudStride 1", href: "/san-pham/cloudstride-1" },
              { text: "Mule Rose", href: "/san-pham/cloud-mule-1-rose" },
              { text: "Mule Vanilla Cream", href: "/san-pham/cloud-mule-1-vanilla-cream" },
            ],
          },
          {
            type: "paragraph",
            text: "Tháng 9 này, Hà Nội có đủ mọi lý do để bạn xuống phố: một lễ hội văn hóa quy mô, hàng loạt quán ăn – quán cà phê đáng thử (cả nổi tiếng lẫn \"bí mật\"), những hoạt động ngoài trời thú vị, một chỗ ở tiện nghi và một đôi giày thoải mái để đồng hành suốt hành trình. Theo dõi chúng tôi để cập nhật thêm nhiều gợi ý mới mỗi tháng!",
          },
        ],
      },
      en: {
        title: "Hanoi in September: Festivals, Food & Local Tips",
        excerpt:
          "The Thang Long – Hanoi Festival, must-try spots both famous and secret, outdoor activities, and where to stay — everything for a full September in Hanoi.",
        content: [
          {
            type: "paragraph",
            text: "This September, Hanoi eases into autumn with a lively cultural festival, a fresh wave of cafés and eateries taking over social media, and endless reasons to grab your camera and head out. Here's the roundup, plus a few tips to make the most of a Hanoi autumn.",
          },
          {
            type: "gallery",
            images: [
              { src: "/images/news/ho-tay-chieu-hoang-hon.webp", alt: "Sunset over West Lake, Tran Quoc Pagoda silhouette" },
              { src: "/images/news/ho-tay-hoang-hon.webp", alt: "Vivid sunset over West Lake" },
              { src: "/images/news/ho-tay-cay-ven-ho.webp", alt: "West Lake at dusk, trees along the shore" },
            ],
            credit: "Photos: NKSTTSSHNVN, Rungbachduong — Wikimedia Commons (CC BY-SA)",
          },
          { type: "heading", level: 2, text: "1. This month's highlight events" },
          { type: "heading", level: 3, text: "Thang Long – Hanoi Festival, 2nd edition, 2026" },
          {
            type: "paragraph",
            text: "This is easily the biggest cultural event of the month in the capital. Themed \"Heritage Flow\", this year's festival returns for its second edition, expanded in scale and spread across several of Hanoi's most iconic heritage sites.",
          },
          {
            type: "list",
            items: [
              { title: "Dates", text: "September 11–20, 2026" },
              {
                title: "Venues",
                text: "Thang Long Imperial Citadel, Temple of Literature, Hanoi Museum, Dong Kinh Nghia Thuc Square, and Bat Trang pottery village",
              },
              {
                title: "Worth knowing",
                text: "It's a journey across multiple sites rather than one fixed stage — each venue holds its own story, from heritage meeting technology to a craft village built on sound.",
              },
            ],
          },
          {
            type: "gallery",
            images: [
              { src: "/images/news/hoang-thanh-thang-long.webp", alt: "Doan Mon gate, Thang Long Imperial Citadel" },
              { src: "/images/news/van-mieu.webp", alt: "Khue Van Cac pavilion, Temple of Literature" },
              { src: "/images/news/bao-tang-ha-noi.webp", alt: "Hanoi Museum" },
              { src: "/images/news/dong-kinh-nghia-thuc.webp", alt: "Hoan Kiem Lake at night, near Dong Kinh Nghia Thuc Square" },
              { src: "/images/news/bat-trang.webp", alt: "Bat Trang pottery village" },
            ],
            credit:
              "Photos: Phan Minh Tuan, Edgardo W. Olivera, Grenouille vert, Adam Jones, Steven C. Price — Wikimedia Commons (CC BY-SA)",
          },
          {
            type: "note",
            text: "A great moment to point short-stay or international guests toward an authentic local cultural experience.",
          },
          { type: "heading", level: 3, text: "Trade fairs & exhibitions" },
          {
            type: "paragraph",
            text: "Alongside the cultural program, Hanoi also hosts several trade exhibitions this month — handy to know if you're hosting business travelers. Most run September 9–11, 2026 at the Vietnam Exposition Center (VEC), Dong Anh:",
          },
          {
            type: "list",
            items: [
              { text: "VIOE 2026 — Vietnam International Optoelectronics Exhibition" },
              { text: "Automation World Vietnam — smart factory & automation show" },
              { text: "VIIF 2026 — Vietnam International Industrial Fair" },
              { text: "HE EXPO — hardware, hand tools, fasteners & electromechanical equipment" },
              { text: "Wire & Cable Show Vietnam — electrical equipment, wire & cable exhibition" },
            ],
          },
          { type: "heading", level: 2, text: "2. Food & drinks worth trying" },
          {
            type: "paragraph",
            text: "Since most of our readers are visitors from abroad, we've split this list into two groups: spots that are already world-famous on the travel circuit, and places that are pure Hanoi-local taste — the ones most tourists never hear about, for anyone after a deeper experience.",
          },
          { type: "heading", level: 3, text: "Group 1 — Traveler favorites" },
          {
            type: "paragraph",
            text: "These show up in nearly every Hanoi travel guide — easy to find, easy to book, a solid pick for your first day in the city:",
          },
          {
            type: "list",
            items: [
              {
                title: "Bun Cha Huong Lien (\"Obama Bun Cha\")",
                text: "The bun cha spot where former US President Barack Obama dined with chef Anthony Bourdain in 2016, now recognized in the Michelin Guide. 24 Le Van Huu, Hai Ba Trung, Hanoi.",
                image: "/images/news/bun-cha-huong-lien.webp",
              },
              {
                title: "Cafe Giang",
                text: "The birthplace of Hanoi's famous egg coffee, since 1946. Tucked down a narrow alley — look for the faded yellow walls and wooden sign. 39 Nguyen Huu Huan, Hoan Kiem, Hanoi.",
                image: "/images/news/ca-phe-giang.webp",
              },
              {
                title: "Banh Mi 25",
                text: "Classic Vietnamese banh mi, fair prices, a newcomer-friendly space. 25 Hang Ca, Hoan Kiem, Hanoi.",
              },
              {
                title: "Hanoi Social Club",
                text: "A café and creative space down a small alley, loved by international visitors for its cozy vibe and varied menu. 6 Ngo Hoi Vu, Hoan Kiem, Hanoi.",
              },
              {
                title: "Ta Hien Street (\"Beer Corner\")",
                text: "A row of back-to-back bars, the classic evening meeting spot for backpackers. Ta Hien Street, Hoan Kiem, Hanoi.",
              },
            ],
          },
          { type: "heading", level: 3, text: "Group 2 — Local favorites, off the tourist trail" },
          {
            type: "paragraph",
            text: "For guests after something further off the beaten path, here are a few names worth trying — usually tucked down an alley with no flashy signage, but trusted by locals:",
          },
          {
            type: "list",
            items: [
              {
                title: "Pho Ga Nguyet",
                text: "A chicken pho spot beloved by local food lovers, Michelin-recognized four years running, near Hoan Kiem Lake but still full street-food character. 5B Phu Doan, Hang Trong, Hoan Kiem, Hanoi.",
                image: "/images/news/pho-ga-nguyet.webp",
              },
              {
                title: "Tranquil Books & Coffee",
                text: "A quiet book café with a bookish atmosphere — a good spot to slow down mid-itinerary. 5 Nguyen Quang Bich, Hoan Kiem, Hanoi.",
              },
              {
                title: "Habakuk Fine Coffee & Bistro",
                text: "Modern, creative, and still reasonably priced — rarely shows up on the popular travel apps. 4 Phan Huy Chu, Hoan Kiem, Hanoi.",
                image: "/images/news/habakuk.webp",
              },
              {
                title: "MAU Gastro Wine Bar",
                text: "A modern, cozy two-floor space near the Temple of Literature — one of the Thang Long Festival venues. 5 Van Mieu, Dong Da, Hanoi.",
              },
              {
                title: "Hidden Pub Hanoi",
                text: "An unmarked bar — look for the red doorbell — a true \"secret bar\" passed along by locals and in-the-know regulars. Ta Hien Street, Hoan Kiem, Hanoi.",
              },
            ],
          },
          {
            type: "note",
            text: "Tip: most of these local spots sit down small alleys and can be hard to find on Google Maps by their Vietnamese name — save the English name or drop a pin before you head out.",
          },
          { type: "heading", level: 2, text: "3. Outdoor activities" },
          {
            type: "paragraph",
            text: "Beyond eating and café-hopping, September's cooler weather is also ideal for getting outside. A few ideas that suit short-stay visitors:",
          },
          {
            type: "list",
            items: [
              {
                title: "Cycling the Old Quarter and Long Bien Bridge",
                text: "A morning ride along the Red River, past local markets and village outskirts — a closer look at everyday local life.",
              },
              {
                title: "Cyclo tour + egg coffee",
                text: "A cyclo ride through the 36 streets, ending with an egg coffee break — great for a gentle, low-effort way to explore.",
              },
              {
                title: "Walking or running around Hoan Kiem Lake and West Lake",
                text: "Early mornings around both lakes are full of locals exercising and practicing tai chi — also the best light for photos.",
              },
              {
                title: "Afternoon Vespa tour",
                text: "Explore the outskirts and the Co Loa relic site — good for guests who like a bit of speed and fewer beaten paths.",
              },
              {
                title: "Ninh Binh day trip (Trang An – Tam Coc – Hang Mua)",
                text: "A full-day trip combining a boat ride through caves, cycling through the countryside, and a hilltop viewpoint — great if you only have one free day outside Hanoi.",
              },
              {
                title: "Outdoor cooking class or guided street food tour",
                text: "Light activity paired with a food-culture experience.",
              },
            ],
          },
          { type: "heading", level: 2, text: "4. Where to stay in Hanoi" },
          {
            type: "paragraph",
            text: "Looking for a place to stay around West Lake, close to the cafés above and within easy reach of the Thang Long Festival? Four Season Serenity at 53E, Alley 31 Xuan Dieu is well worth considering.",
            links: [{ text: "See SD Housing (Four Season Serenity)", href: "/sd-housing" }],
          },
          {
            type: "list",
            items: [
              {
                title: "Location",
                text: "53E, Alley 31 Xuan Dieu — right in the West Lake area, close to the trending cafés above and the city's cultural spaces.",
              },
              {
                title: "Great for short stays",
                text: "Ideal for travelers or business guests wanting to experience Hanoi at a local pace.",
              },
              {
                title: "Quiet, private space",
                text: "A comfortable place to unwind after a day of walking, café-hopping, and festival browsing.",
              },
            ],
          },
          {
            type: "note",
            text: "Get in touch with us for availability and September festival-season booking offers.",
          },
          { type: "heading", level: 2, text: "5. A small tip for getting around" },
          {
            type: "paragraph",
            text: "The schedule this season is packed — coffee in the morning, the Festival in the afternoon, then hopping between check-in spots at night. A comfortable, easy-to-style pair of shoes makes all that walking a lot easier — which is why a lot of young Hanoians are reaching for minimal, lightweight styles like CloudS these days: on-trend enough for street style, comfortable enough to walk all day without tired feet. A few worth checking out:",
            links: [
              { text: "CloudStride 1", href: "/san-pham/cloudstride-1" },
              { text: "Mule Rose", href: "/san-pham/cloud-mule-1-rose" },
              { text: "Mule Vanilla Cream", href: "/san-pham/cloud-mule-1-vanilla-cream" },
            ],
          },
          {
            type: "paragraph",
            text: "This September, Hanoi gives you every reason to get out and explore: a large-scale cultural festival, a lineup of must-try restaurants and cafés (both famous and \"secret\"), fun outdoor activities, a comfortable place to stay, and a comfortable pair of shoes to go with it all. Follow us for more monthly tips!",
          },
        ],
      },
    },
  },
];

export function getNewsPostBySlug(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}

export function getLocalizedPost(post: NewsPost, locale: Locale) {
  return { ...post, ...post.translations[locale] };
}

export function formatNewsDate(date: string, locale: Locale = "vi") {
  return new Date(date).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
