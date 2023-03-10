// 遊戲初始化
function init() {
	$("#begin").show();
	$(".card").remove();
	$("#review").children().remove();
	// 75張 * 2
	for (let i = 0; i < 150; i++) {
		$("#game").append(` <div class="card card-open">
    <div class="card-front"></div>
    <div class="card-back"></div>
  </div>`);
	}
	// 決定數字
	for (let i = 0; i < 150; i++) {

		const num = (i % 75) + 1;
		if (i < 75) {
			$(".card")
				.eq(i)
				.find(".card-front")
				.css("background-image", `url('./PNG/A(${num}).png')`);
			$(".card").eq(i).attr("data-card", num);
		} else {
			$(".card")
				.eq(i)
				.find(".card-front")
				.css("background-image", `url('./PNG/A(${num}).png')`);
			$(".card").eq(i).attr("data-card", num);
		}
		// 打散
		const target = Math.round(Math.random() * 74);
		$(".card").eq(target).insertAfter($(".card").eq(i));
	}

	// 隨機
	let str = "";
	let numbers = [];
	for (let i = 0; i < 60; i++) {
		str = Math.ceil(Math.random() * 75);
		for (j = 0; j < numbers.length; j++) {
			if (numbers[j] == str) {
				numbers.splice(j, 1);
				i--;
			}
		}
		numbers.push(str);
	}
	// console.log(numbers);

	// 選到的隱藏
	for (let number of numbers) {
		$(`[data-card="${number}"]`).hide();
	}
}
init();

// 點擊開始
$("#btnStart").on("click", function () {
	$("#begin").hide();
	$(".card").removeClass("card-open");
	let time = 0;
	timer = setInterval(() => {
		time++;
		$("#time").text(time);
	}, 1000);
	// 翻牌
	$("#game").on("click", ".card", function () {
		// 最多翻兩張
		if ($(".card-open").length < 2 && !$(this).hasClass("card-open")) {
			$(this).addClass("card-open");
		}
		// 翻開兩張
		if ($(".card-open").length === 2) {
			// 兩張數字一樣
			if (
				$(".card-open").eq(0).attr("data-card") ===
				$(".card-open").eq(1).attr("data-card")
			) {
				$(".card-open").addClass("card-ok");
				$(".card-open .card-front").fadeTo(1000, 0);
			}
			setTimeout(() => {
				$(".card-open").each(function () {
					if ($(this).find(".card-front").css("opacity") != 1) {
						$(this).css("opacity", 0);
					}
				});

				$(".card-open").removeClass("card-open");
				if ($(".card-ok").length === 30) {
					clearInterval(timer);
					Swal.fire({
						title: "恭喜通關",
						imageUrl: "../atoz/thumbs.png",
						text: ` You spend ${time} s , Unbelievable! `,
					}).then((response) => {
						if (response.isConfirmed) {
							init();
						}
					});
				}
			}, 1000);
		}
	});
});
