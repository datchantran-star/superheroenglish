import type { LessonContent } from '@/types';

export const LESSON_LIBRARY: LessonContent[] = [
  {
    key: 'colors-power',
    title: 'Colors of Power',
    theme: 'Learn color words to charge your energy shield',
    missionTitle: 'Nhiệm vụ hôm nay: Lấp sáng Thành phố',
    missionStory:
      'Thành phố đang chìm trong bóng tối! Siêu anh hùng cần thu thập năng lượng từ các màu sắc kỳ diệu để thắp sáng lại mọi ngọn đèn. Bạn sẵn sàng giúp đỡ chưa?',
    missionEmoji: '🌃',
    stages: [
      {
        id: 1,
        title: 'Chặng 1: Thu thập năng lượng',
        subtitle: 'Gom màu sắc để sạc khiên năng lượng',
        storyIntro: [
          { text: 'Bạn bay qua khu vườn cầu vồng, nơi các giọt màu đang trôi nổi.', emoji: '🌈' },
          { text: 'Mỗi màu mang một nguồn năng lượng khác nhau. Học tên chúng để thu thập!', emoji: '✨' },
        ],
        vocab: [
          { word: 'Red', emoji: '🔴', translation: 'Đỏ' },
          { word: 'Blue', emoji: '🔵', translation: 'Xanh dương' },
          { word: 'Green', emoji: '🟢', translation: 'Xanh lá' },
          { word: 'Yellow', emoji: '🟡', translation: 'Vàng' },
        ],
        quiz: [
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Màu đỏ"?',
            emoji: '',
            options: ['Blue', 'Red', 'Green'],
            correctIndex: 1,
          },
          {
            type: 'image',
            question: 'Nhìn hình và chọn từ đúng',
            emoji: '🔵',
            options: ['Yellow', 'Green', 'Blue'],
            correctIndex: 2,
          },
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Màu xanh lá"?',
            emoji: '',
            options: ['Green', 'Red', 'Yellow'],
            correctIndex: 0,
          },
        ],
        storyOutro: [
          { text: 'Khiên năng lượng của bạn đã sáng lên rực rỡ!', emoji: '🛡️' },
          { text: 'Nhưng phía trước còn nhiều chướng ngại vật...', emoji: '⚡' },
        ],
      },
      {
        id: 2,
        title: 'Chặng 2: Vượt chướng ngại vật',
        subtitle: 'Dùng màu sắc để phá rào chắn',
        storyIntro: [
          { text: 'Một bức tường đá khổng lồ chắn ngang đường bay của bạn.', emoji: '🧱' },
          { text: 'Trên tường có các ký hiệu màu — chỉ đúng màu mới mở được!', emoji: '🔑' },
        ],
        vocab: [
          { word: 'Orange', emoji: '🟠', translation: 'Cam' },
          { word: 'Purple', emoji: '🟣', translation: 'Tím' },
          { word: 'Pink', emoji: '🩷', translation: 'Hồng' },
          { word: 'Black', emoji: '⚫', translation: 'Đen' },
        ],
        quiz: [
          {
            type: 'image',
            question: 'What is this?',
            emoji: '🟠',
            options: ['Pink', 'Orange', 'Black'],
            correctIndex: 1,
          },
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Màu tím"?',
            emoji: '',
            options: ['Purple', 'Orange', 'Pink'],
            correctIndex: 0,
          },
          {
            type: 'image',
            question: 'Nhìn hình và chọn từ đúng',
            emoji: '🩷',
            options: ['Black', 'Purple', 'Pink'],
            correctIndex: 2,
          },
        ],
        storyOutro: [
          { text: 'Bức tường đá vỡ vụn thành hàng nghìn mảnh!', emoji: '💥' },
          { text: 'Phía xa, bóng hình kẻ thù đã xuất hiện...', emoji: '👁️' },
        ],
      },
      {
        id: 3,
        title: 'Chặng 3: Trận chiến cuối cùng',
        subtitle: 'Tổng hợp tất cả màu sắc để đánh bại kẻ thù',
        storyIntro: [
          { text: 'Kẻ thù bóng tối xuất hiện, nuốt chửng mọi ánh sáng!', emoji: '🌑' },
          { text: 'Bạn phải dùng TẤT CẢ màu sắc đã học để tạo chớp cầu vồng cuối cùng!', emoji: '⚡' },
        ],
        vocab: [
          { word: 'White', emoji: '⚪', translation: 'Trắng' },
          { word: 'Brown', emoji: '🟤', translation: 'Nâu' },
          { word: 'Gray', emoji: '🔘', translation: 'Xám' },
          { word: 'Gold', emoji: '🟨', translation: 'Vàng kim' },
        ],
        quiz: [
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Màu trắng"?',
            emoji: '',
            options: ['White', 'Brown', 'Gold'],
            correctIndex: 0,
          },
          {
            type: 'image',
            question: 'What is this?',
            emoji: '🟤',
            options: ['Gray', 'Brown', 'White'],
            correctIndex: 1,
          },
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Màu vàng kim"?',
            emoji: '',
            options: ['Gold', 'Brown', 'Gray'],
            correctIndex: 0,
          },
        ],
        storyOutro: [
          { text: 'Chớp cầu vồng xuyên qua bóng tối, đánh bại kẻ thù!', emoji: '🌈' },
          { text: 'Thành phố sáng bừng lên. Bạn là anh hùng!', emoji: '🏙️' },
        ],
      },
    ],
    finaleStory: [
      { text: 'Bạn đã thu thập đủ năng lượng màu sắc để cứu thành phố!', emoji: '🏆' },
      { text: 'Rương kho báu xuất hiện — mở nó ra để nhận phần thưởng!', emoji: '🎁' },
    ],
  },
  {
    key: 'animal-allies',
    title: 'Animal Allies',
    theme: 'Learn animal words to summon your sidekicks',
    missionTitle: 'Nhiệm vụ hôm nay: Tìm đồng minh động vật',
    missionStory:
      'Siêu anh hùng không thể chiến đấu một mình! Bạn cần gọi các đồng minh động vật từ khắp nơi trên thế giới. Học tên tiếng Anh của chúng để triệu hồi!',
    missionEmoji: '🦸',
    stages: [
      {
        id: 1,
        title: 'Chặng 1: Thu thập năng lượng',
        subtitle: 'Gọi các đồng minh từ rừng sâu',
        storyIntro: [
          { text: 'Bạn bước vào khu rừng cổ thụ, nơi tiếng chim vang vọng.', emoji: '🌳' },
          { text: 'Mỗi con vật mang một sức mạnh đặc biệt. Học tên chúng để triệu hồi!', emoji: '🦅' },
        ],
        vocab: [
          { word: 'Lion', emoji: '🦁', translation: 'Sư tử' },
          { word: 'Tiger', emoji: '🐯', translation: 'Hổ' },
          { word: 'Bear', emoji: '🐻', translation: 'Gấu' },
          { word: 'Wolf', emoji: '🐺', translation: 'Sói' },
        ],
        quiz: [
          {
            type: 'image',
            question: 'What is this?',
            emoji: '🦁',
            options: ['Bear', 'Lion', 'Wolf'],
            correctIndex: 1,
          },
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Con hổ"?',
            emoji: '',
            options: ['Tiger', 'Lion', 'Bear'],
            correctIndex: 0,
          },
          {
            type: 'image',
            question: 'Nhìn hình và chọn từ đúng',
            emoji: '🐺',
            options: ['Bear', 'Wolf', 'Tiger'],
            correctIndex: 1,
          },
        ],
        storyOutro: [
          { text: 'Bốn đồng minh rừng đã đứng sau lưng bạn!', emoji: '🌲' },
          { text: 'Nhưng biển cả đang gọi tên bạn...', emoji: '🌊' },
        ],
      },
      {
        id: 2,
        title: 'Chặng 2: Vượt chướng ngại vật',
        subtitle: 'Triệu hồi đồng minh từ đại dương',
        storyIntro: [
          { text: 'Bờ biển đầy đá ngầm, không thể bay qua.', emoji: '🪨' },
          { text: 'Chỉ đồng minh biển mới dẫn bạn qua an toàn!', emoji: '🐬' },
        ],
        vocab: [
          { word: 'Dolphin', emoji: '🐬', translation: 'Cá heo' },
          { word: 'Shark', emoji: '🦈', translation: 'Cá mập' },
          { word: 'Whale', emoji: '🐋', translation: 'Cá voi' },
          { word: 'Crab', emoji: '🦀', translation: 'Cua' },
        ],
        quiz: [
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Cá heo"?',
            emoji: '',
            options: ['Shark', 'Dolphin', 'Whale'],
            correctIndex: 1,
          },
          {
            type: 'image',
            question: 'What is this?',
            emoji: '🐋',
            options: ['Whale', 'Dolphin', 'Shark'],
            correctIndex: 0,
          },
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Con cua"?',
            emoji: '',
            options: ['Whale', 'Crab', 'Shark'],
            correctIndex: 1,
          },
        ],
        storyOutro: [
          { text: 'Đồng minh biển đã dọn đường cho bạn!', emoji: '🌊' },
          { text: 'Bầu trời xuất hiện bóng hình kẻ thù cuối cùng...', emoji: '🐉' },
        ],
      },
      {
        id: 3,
        title: 'Chặng 3: Trận chiến cuối cùng',
        subtitle: 'Tổng hợp tất cả đồng minh để chiến đấu',
        storyIntro: [
          { text: 'Rồng bóng tối tấn công từ trên trời cao!', emoji: '🐉' },
          { text: 'Bạn cần gọi thêm đồng minh trên không để hỗ trợ!', emoji: '🦅' },
        ],
        vocab: [
          { word: 'Eagle', emoji: '🦅', translation: 'Đại bàng' },
          { word: 'Owl', emoji: '🦉', translation: 'Cú mèo' },
          { word: 'Bat', emoji: '🦇', translation: 'Dơi' },
          { word: 'Hawk', emoji: '🦅', translation: 'Diều hâu' },
        ],
        quiz: [
          {
            type: 'image',
            question: 'What is this?',
            emoji: '🦉',
            options: ['Eagle', 'Owl', 'Bat'],
            correctIndex: 1,
          },
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Con dơi"?',
            emoji: '',
            options: ['Bat', 'Owl', 'Hawk'],
            correctIndex: 0,
          },
          {
            type: 'image',
            question: 'Nhìn hình và chọn từ đúng',
            emoji: '🦇',
            options: ['Bat', 'Owl', 'Hawk'],
            correctIndex: 0,
          },
        ],
        storyOutro: [
          { text: 'Tất cả đồng minh cùng tấn công, đánh bại rồng bóng tối!', emoji: '⚔️' },
          { text: 'Thế giới an toàn. Bạn là thủ lĩnh của đàn!', emoji: '👑' },
        ],
      },
    ],
    finaleStory: [
      { text: 'Bạn đã triệu hồi đủ đồng minh để bảo vệ thế giới!', emoji: '🏆' },
      { text: 'Rương kho báu xuất hiện — mở nó ra để nhận phần thưởng!', emoji: '🎁' },
    ],
  },
  {
    key: 'action-verbs',
    title: 'Action Verbs',
    theme: 'Learn action words to unlock your super moves',
    missionTitle: 'Nhiệm vụ hôm nay: Mở khóa siêu chiêu',
    missionStory:
      'Siêu anh hùng cần học các động tác chiến đấu để đối phó với kẻ thù. Mỗi từ vựng là một siêu chiêu mới. Nắm vững chúng để sẵn sàng chiến đấu!',
    missionEmoji: '💥',
    stages: [
      {
        id: 1,
        title: 'Chặng 1: Thu thập năng lượng',
        subtitle: 'Học các siêu chiêu cơ bản',
        storyIntro: [
          { text: 'Bạn bước vào phòng tập luyện dưới lòng đất.', emoji: '🏋️' },
          { text: 'Huấn luyện viên AI sẽ dạy bạn các động tác cơ bản!', emoji: '🤖' },
        ],
        vocab: [
          { word: 'Run', emoji: '🏃', translation: 'Chạy' },
          { word: 'Jump', emoji: '🦘', translation: 'Nhảy' },
          { word: 'Fly', emoji: '🦅', translation: 'Bay' },
          { word: 'Swim', emoji: '🏊', translation: 'Bơi' },
        ],
        quiz: [
          {
            type: 'image',
            question: 'What is this?',
            emoji: '🏃',
            options: ['Fly', 'Run', 'Swim'],
            correctIndex: 1,
          },
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Nhảy"?',
            emoji: '',
            options: ['Jump', 'Run', 'Fly'],
            correctIndex: 0,
          },
          {
            type: 'image',
            question: 'Nhìn hình và chọn từ đúng',
            emoji: '🦅',
            options: ['Swim', 'Jump', 'Fly'],
            correctIndex: 2,
          },
        ],
        storyOutro: [
          { text: 'Bạn đã nắm vững các động tác cơ bản!', emoji: '💪' },
          { text: 'Siêu chiêu nâng cao đang chờ phía trước...', emoji: '🎯' },
        ],
      },
      {
        id: 2,
        title: 'Chặng 2: Vượt chướng ngại vật',
        subtitle: 'Kết hợp động tác để vượt chướng ngại',
        storyIntro: [
          { text: 'Một đường hầm đầy cạm bẫy xuất hiện!', emoji: '🕳️' },
          { text: 'Bạn cần dùng đúng động tác để vượt qua từng chướng ngại!', emoji: '⚡' },
        ],
        vocab: [
          { word: 'Climb', emoji: '🧗', translation: 'Trèo' },
          { word: 'Dodge', emoji: '🤸', translation: 'Né' },
          { word: 'Punch', emoji: '👊', translation: 'Đấm' },
          { word: 'Kick', emoji: '🦵', translation: 'Đá' },
        ],
        quiz: [
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Trèo"?',
            emoji: '',
            options: ['Climb', 'Punch', 'Dodge'],
            correctIndex: 0,
          },
          {
            type: 'image',
            question: 'What is this?',
            emoji: '🤸',
            options: ['Kick', 'Dodge', 'Climb'],
            correctIndex: 1,
          },
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Đấm"?',
            emoji: '',
            options: ['Punch', 'Dodge', 'Kick'],
            correctIndex: 0,
          },
        ],
        storyOutro: [
          { text: 'Bạn đã vượt qua đường hầm an toàn!', emoji: '✅' },
          { text: 'Sàn đấu cuối cùng đã mở ra...', emoji: '🥊' },
        ],
      },
      {
        id: 3,
        title: 'Chặng 3: Trận chiến cuối cùng',
        subtitle: 'Dùng tất cả siêu chiêu để chiến thắng',
        storyIntro: [
          { text: 'Kẻ thù mạnh nhất đứng trên sàn đấu!', emoji: '🥊' },
          { text: 'Bạn phải dùng TẤT CẢ siêu chiêu đã học để chiến thắng!', emoji: '💥' },
        ],
        vocab: [
          { word: 'Fight', emoji: '⚔️', translation: 'Chiến đấu' },
          { word: 'Defend', emoji: '🛡️', translation: 'Phòng thủ' },
          { word: 'Charge', emoji: '⚡', translation: 'Tấn công' },
          { word: 'Win', emoji: '🏆', translation: 'Chiến thắng' },
        ],
        quiz: [
          {
            type: 'image',
            question: 'What is this?',
            emoji: '⚔️',
            options: ['Fight', 'Defend', 'Win'],
            correctIndex: 0,
          },
          {
            type: 'translate',
            question: 'Từ nào dưới đây có nghĩa là "Phòng thủ"?',
            emoji: '',
            options: ['Charge', 'Defend', 'Fight'],
            correctIndex: 1,
          },
          {
            type: 'image',
            question: 'Nhìn hình và chọn từ đúng',
            emoji: '🏆',
            options: ['Win', 'Defend', 'Charge'],
            correctIndex: 0,
          },
        ],
        storyOutro: [
          { text: 'Bạn tung đòn quyết định, hạ gục kẻ thù!', emoji: '💥' },
          { text: 'Đám đông reo hò. Bạn là nhà vô địch!', emoji: '🎉' },
        ],
      },
    ],
    finaleStory: [
      { text: 'Bạn đã mở khóa tất cả siêu chiêu và chiến thắng!', emoji: '🏆' },
      { text: 'Rương kho báu xuất hiện — mở nó ra để nhận phần thưởng!', emoji: '🎁' },
    ],
  },
];

export function getLessonByKey(key: string): LessonContent | undefined {
  return LESSON_LIBRARY.find((l) => l.key === key);
}

export function pickLessonKeyForDate(dateStr: string, level: number = 1): string {
  const dayOfYear = Math.floor(
    (new Date(dateStr).getTime() - new Date(new Date(dateStr).getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const offset = Math.max(0, Math.min(level - 1, LESSON_LIBRARY.length - 1));
  return LESSON_LIBRARY[(dayOfYear + offset) % LESSON_LIBRARY.length].key;
}
