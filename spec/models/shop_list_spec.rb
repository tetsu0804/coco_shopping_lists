require 'rails_helper'

RSpec.describe ShopList, type: :model do
  before do
    @tarou = User.create(last_name: '吉田', first_name: '太朗', email: 'test@test.com', password: 'password', password_confirmation: 'password')
    time = Time.zone.parse('2021-10-19 00:00:00 +00:00')
    ti = '2021-10-19 00:00:00 +00:00'
    @canan = ShopList.create(list_name: 'ロイヤルカナン', price: 5000, purchasedate: ti, user_id: @tarou.id)
  end

  context 'valid' do
    it '@canan' do
      expect(@canan).to be_valid
    end

    context '文字数' do
      it 'list_name 50文字' do
        @canan.list_name = 'a' * 50
        expect(@canan).to be_valid
      end
    end
  end

  context 'invalid' do
    context 'nul' do
      it 'list_name' do
        @canan.list_name = ''
        expect(@canan).to_not be_valid
      end

      it 'price' do
        @canan.price = ''
        expect(@canan).to_not be_valid
      end

      it 'purchasedate' do
        @canan.purchasedate = ''
        expect(@canan).to_not be_valid
      end

      it 'user_id' do
        @canan.user_id = ''
        expect(@canan).to_not be_valid
      end
    end

    context '文字数' do
      it 'list_name 51文字' do
        @canan.list_name = 'a' * 51
        expect(@canan).to_not be_valid
      end
    end

    context '型' do
      context 'price (整数)' do
        it '漢字も受け付けない' do
          @canan.price = '千'
          expect(@canan).to_not be_valid
        end

        it '小数点も受け付けない' do
          @canan.price = '1.5'
          expect(@canan).to_not be_valid
        end

        it '小数点も受け付けない' do
          @canan.price = 1.5
          expect(@canan).to_not be_valid
        end

        it 'マイナス - は受け付けない' do
          @canan.price = -1
          expect(@canan).to_not be_valid
        end
      end

      context 'purchasedate (日付)' do
        it 'ただの文字列' do
          @canan.purchasedate = '二千二十一年十月十九日'
          expect(@canan).to_not be_valid
        end

        it '整数' do
          @canan.purchasedate = 1111111
          expect(@canan).to_not be_valid
        end
      end
    end
  end
end
