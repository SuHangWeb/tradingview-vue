export default {
  name: 'お名前',
  tel: '電話番号',
  save: 'セーブ',
  confirm: '確認',
  cancel: 'キャンセル',
  delete: '削除',
  complete: '完了',
  loading: '読み込み中...',
  telEmpty: '電話番号を入力してください',
  nameEmpty: '名前を入力してください',
  nameInvalid: '正しい名前を入力してください',
  confirmDelete: '本当に削除しますか',
  telInvalid: '正しい電話番号を入力してください',
  vanCalendar: {
    end: '終了',
    start: '開始',
    title: '日付選択',
    confirm: '確認',
    startEnd: '開始/終了',
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    monthTitle: function monthTitle(year, month) {
      return year + "\u5E74" + month + "\u6708";
    },
    rangePrompt: function rangePrompt(maxRange) {
      return maxRange + "\u65E5\u4EE5\u5185\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044";
    }
  },
  vanContactCard: {
    addText: '連絡先を追加'
  },
  vanContactList: {
    addText: '新しい連絡先を追加'
  },
  vanPagination: {
    prev: '前のページ',
    next: '次のページ'
  },
  vanPullRefresh: {
    pulling: 'プルダウンして更新...',
    loosing: 'リリース時に更新...'
  },
  vanSubmitBar: {
    label: '合計：'
  },
  vanCoupon: {
    unlimited: '入場ありません',
    discount: function discount(_discount) {
      return 10 - _discount + "\u5272\u5F15";
    },
    condition: function condition(_condition) {
      return _condition + "\u5186\u4EE5\u4E0A\u3067\u5229\u7528\u53EF\u80FD";
    }
  },
  vanCouponCell: {
    title: 'クーポン',
    tips: '利用可能なクーポンがありません',
    count: function count(_count) {
      return _count + "\u679A\u304C\u5229\u7528\u53EF\u80FD";
    }
  },
  vanCouponList: {
    empty: 'クーポンはありません',
    exchange: '両替',
    close: 'クーポンを使用しません',
    enable: '利用可能',
    disabled: '利用できません',
    placeholder: '割引コードを入力してください'
  },
  vanAddressEdit: {
    area: '地域',
    postal: '郵便番号',
    areaEmpty: '地域を選択してください',
    addressEmpty: '詳しい住所を入力してください',
    postalEmpty: '邮政编码格式不正确',
    defaultAddress: 'デフォルトの住所に設定',
    telPlaceholder: '荷受人の携帯番号',
    namePlaceholder: '荷受人の名前',
    areaPlaceholder: '县 / 市 / 町を選択'
  },
  vanAddressEditDetail: {
    label: '詳しい住所',
    placeholder: '番地、階の部屋番号など'
  },
  vanAddressList: {
    add: '住所を追加'
  }
};