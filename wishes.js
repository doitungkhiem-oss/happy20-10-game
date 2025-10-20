const wishes = [
"🌷 Chúc bạn luôn tỏa sáng như ánh bình minh,\nDẫu thế gian có đổi thay, lòng bạn vẫn rạng ngời.\nHãy để nụ cười của bạn làm tan mọi ưu phiền nhé!",

"💖 Mong bạn luôn yêu đời và tin vào chính mình,\nVì cuộc sống này đẹp nhất khi ta sống thật lòng.\nBạn xứng đáng nhận được mọi điều tốt đẹp nhất!",

"🌼 Mỗi ngày là một khởi đầu mới,\nMột cơ hội để bạn viết nên câu chuyện tuyệt vời.\nHãy bước đi bằng trái tim đầy tự tin và yêu thương!",

"🌺 Hãy để gió mang đi nỗi buồn và giữ lại niềm vui,\nCuộc đời bạn là đóa hoa rực rỡ giữa muôn ngàn sắc màu.\nChúc bạn luôn nở nụ cười đẹp nhất thế gian!",

"💐 Chúc bạn luôn được bao quanh bởi yêu thương,\nNhư những cánh hoa được nắng mai ôm ấp.\nMỗi ngày đều là một món quà trọn vẹn dành cho bạn!",

"🌸 Dù ở đâu, bạn cũng mang theo ánh sáng của riêng mình,\nMột tâm hồn dịu dàng và mạnh mẽ.\nHãy cứ tỏa sáng theo cách của bạn nhé! Và mình sẽ tặng cho bạn một món quà xinh. Nếu bạn nhận được thông báo này thì hãy tìm mình ở hòm thư",

"🌻 Cuộc sống không hoàn hảo, nhưng bạn thì có thể khiến nó đẹp hơn,\nBằng lòng nhân hậu và sự kiên cường trong tim.\nChúc bạn luôn mỉm cười thật rạng rỡ!",

"🌷 Hãy sống như đóa hoa, lặng lẽ nhưng bền bỉ,\nDù mưa hay nắng vẫn tỏa hương ngọt ngào.\nBạn chính là điều kỳ diệu giữa đời thường!",

"💮 Một trái tim biết yêu thương là tài sản vô giá,\nMột tâm hồn biết sẻ chia là phép màu của hạnh phúc.\nChúc bạn luôn giữ được cả hai điều ấy mãi mãi!",

"🌹 Hãy để lòng bình yên như cơn gió nhẹ,\nĐể yêu thương dẫn lối bạn đi qua mọi bão giông.\nBạn thật tuyệt vời, đừng quên điều đó nhé!",

"🌈 Hôm nay, hãy dành cho bản thân chút dịu dàng,\nVì bạn xứng đáng được nghỉ ngơi, được yêu và được trân trọng.\nMong bạn luôn tìm thấy bình yên trong từng hơi thở!",

"🌼 Mỗi nụ cười của bạn là một vì sao trên bầu trời,\nChiếu sáng cả thế giới quanh bạn.\nChúc bạn luôn rạng rỡ và đầy niềm tin!",

"🌺 Hãy để trái tim bạn tự do ca hát,\nDù cuộc đời có muôn ngả đường khác nhau.\nVì hạnh phúc không ở đâu xa, nó ở trong chính bạn!",

"💐 Cuộc sống sẽ luôn có thử thách,\nNhưng với niềm tin và nụ cười, bạn sẽ vượt qua tất cả.\nChúc bạn luôn là chính mình – tuyệt vời và mạnh mẽ!",

"🌸 Mỗi ngày, hãy viết thêm một trang mới cho cuộc đời,\nBằng lòng biết ơn và ước mơ cháy bỏng.\nChúc bạn luôn đi xa hơn những gì bạn từng nghĩ!",

"🌷 Không ai hoàn hảo, nhưng bạn là duy nhất,\nMột mảnh ghép không thể thay thế trong thế giới này.\nChúc bạn luôn hạnh phúc với chính con người mình!",

"💖 Hãy để ánh sáng trong bạn soi rọi người khác,\nVì mỗi hành động tử tế đều làm thế giới đẹp hơn.\nBạn chính là niềm vui mà ai cũng muốn có bên cạnh!",

"🌼 Chúc bạn luôn được bao quanh bởi những người hiểu và yêu bạn,\nVì hạnh phúc là khi ta được là chính mình.\nĐừng quên rằng bạn xứng đáng với điều tốt nhất!",

"🌺 Mỗi thử thách là một cơ hội để trưởng thành,\nMỗi niềm vui là phần thưởng cho nỗ lực hôm qua.\nChúc bạn luôn giữ niềm tin và bước tiếp thật vững vàng!",

"💐 Ngày hôm nay, hãy mỉm cười vì bạn vẫn đang tiến về phía trước,\nHãy cảm ơn vì mọi điều đã giúp bạn mạnh mẽ hơn.\nBạn đang làm rất tốt, đừng nghi ngờ điều đó!",

"🌸 Chúc bạn có những ngày thật nhẹ nhàng,\nKhi lòng an yên và nụ cười vẫn ở đó.\nVì cuộc sống đẹp nhất là khi ta biết trân trọng hiện tại.",

"🌷 Dù nắng hay mưa, bạn vẫn là ánh sáng,\nMang lại ấm áp cho những ai quanh mình.\nHãy luôn tự hào vì chính bạn là điều đặc biệt! Và mình sẽ tặng cho bạn một món quà xinh. Nếu bạn nhận được thông báo này thì hãy tìm mình ở hòm thư",

"💖 Mỗi khi bạn cười, thế giới như sáng hơn đôi chút,\nVì bạn mang trong mình năng lượng của yêu thương.\nChúc bạn luôn sống trọn vẹn với trái tim chân thành!",

"🌼 Thế giới này cần nhiều hơn những tâm hồn như bạn,\nLuôn dịu dàng, bao dung và thấu hiểu.\nHãy tiếp tục lan tỏa yêu thương bằng chính sự hiện diện của mình!",

"🌺 Đừng sợ thất bại, vì đó là bước đệm cho thành công,\nĐừng ngại yêu thương, vì đó là điều làm ta sống thật.\nChúc bạn mạnh mẽ và hạnh phúc trên hành trình của mình!",

"💐 Chúc bạn có đủ kiên cường để vượt qua giông bão,\nVà đủ dịu dàng để yêu thương chính mình.\nVì bạn xứng đáng với những điều đẹp nhất trên đời!",

"🌸 Bạn là bản nhạc dịu êm giữa cuộc sống ồn ào,\nLà ánh nắng sưởi ấm những trái tim quanh mình.\nChúc bạn mãi là chính bạn – rạng rỡ và đáng yêu!",

"🌹 Có thể bạn không hoàn hảo, nhưng bạn tuyệt vời theo cách riêng,\nVà đó chính là điều làm bạn đặc biệt nhất.\nChúc bạn luôn hạnh phúc với hành trình của riêng mình!",

"🌷 Chúc bạn một 20/10 ngập tràn niềm vui,\nNhững yêu thương chân thành từ những người xung quanh.\nVà một trái tim mãi tươi trẻ, ngát hương như đóa hoa xuân!"
];
