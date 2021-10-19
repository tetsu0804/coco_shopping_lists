require 'rails_helper'

RSpec.describe CategoryShopList, type: :model do
  before do
    @tarou = User.create(last_name: '吉田', first_name: '太朗', email: 'test@test.com', password: 'password', password_confirmation: 'password')
    @category_gohan = Category.create(category_name: 'ご飯', user_id: @tarou.id)
    @category_oyatu = Category.create(category_name: 'おやつ', user_id: @tarou.id)
    @shop_list_canan  = ShopList.create(list_name: 'ロイヤルカナン', price: 5000, purchasedate: '2021-10-19 00:00:00 +00:00', user_id: @tarou.id)
    @shop_list_tyuru = ShopList.create(list_name: 'ちゅーる', price: 700, purchasedate: '2021-10-18 00:00:00 +00:00', user_id: @tarou.id)
    @shop_list_hone = ShopList.create(list_name: '骨', price: 500, purchasedate: '2021-10-15 00:00:00 +00:00', user_id: @tarou.id)

    @gohan_canan = CategoryShopList.create(category_id: @category_gohan.id, shop_list_id: @shop_list_canan.id)
    @oyatu_tyuru = CategoryShopList.create(category_id: @category_oyatu.id, shop_list_id: @shop_list_tyuru.id)
    @oyatu_hone = CategoryShopList.create(category_id: @category_oyatu.id, shop_list_id: @shop_list_hone.id)
  end

  context 'valid' do
    it '@gohan_canan' do
      expect(@gohan_canan).to be_valid
      expect(@gohan_canan.category_id).to eq @category_gohan.id
      expect(@gohan_canan.shop_list_id).to eq @shop_list_canan.id
    end

    it '@oyatu_tyuru' do
      expect(@oyatu_tyuru).to be_valid
      expect(@oyatu_tyuru.category_id).to eq @category_oyatu.id
      expect(@oyatu_tyuru.shop_list_id).to eq @shop_list_tyuru.id
    end

    it '@oyatu_hone' do
      expect(@oyatu_hone).to be_valid
      expect(@oyatu_hone.category_id).to eq @category_oyatu.id
      expect(@oyatu_hone.shop_list_id).to eq @shop_list_hone.id
    end

    context 'Categoryモデル shop_listsメソッド shop_listの配列が返る' do
      it '@category_gohan.shop_lists' do
        expect(@category_gohan.shoplists[0].id).to eq @shop_list_canan.id
        expect(@category_gohan.shoplists[0].list_name).to eq 'ロイヤルカナン'
        expect(@category_gohan.shoplists[0].price).to eq 5000
        expect(@category_gohan.shoplists[0].purchasedate).to eq '2021-10-19 00:00:00 +00:00'
      end

      it '@category_oyatu.shoplistsメソッド' do
        expect(@category_oyatu.shoplists[0].id).to eq @shop_list_tyuru.id
        expect(@category_oyatu.shoplists[0].list_name).to eq 'ちゅーる'
        expect(@category_oyatu.shoplists[0].price).to eq 700
        expect(@category_oyatu.shoplists[0].purchasedate).to eq '2021-10-18 00:00:00 +00:00'
        expect(@category_oyatu.shoplists[1].id).to eq @shop_list_hone.id
        expect(@category_oyatu.shoplists[1].list_name).to eq '骨'
        expect(@category_oyatu.shoplists[1].price).to eq 500
        expect(@category_oyatu.shoplists[1].purchasedate).to eq '2021-10-15 00:00:00 +00:00'
      end
    end
    
    context 'ShopListモデル categoriesメソッド categoryの配列が返る' do
      it '@shop_list_canan.categories' do
        expect(@shop_list_canan.categories[0].id).to eq @category_gohan.id
        expect(@shop_list_canan.categories[0].category_name).to eq 'ご飯'
      end

      it '@shop_list_tyuru.cateogries' do
        expect(@shop_list_tyuru.categories[0].id).to eq @category_oyatu.id
        expect(@shop_list_tyuru.categories[0].category_name).to eq 'おやつ'
      end

      it '@shop_list_hone.categories' do
        expect(@shop_list_hone.categories[0].id).to eq @category_oyatu.id
        expect(@shop_list_hone.categories[0].category_name).to eq 'おやつ'
      end
    end
  end
end
