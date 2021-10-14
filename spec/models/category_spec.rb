require 'rails_helper'

RSpec.describe Category, type: :model do
  before do
    @gohan = Category.create(category_name: 'ご飯')
  end

  context 'valid' do
    it '@gohan' do
      expect(@gohan).to be_valid
    end
    context '文字制限' do
      it '20文字' do
        @gohan.category_name = 'a' * 20
        expect(@gohan).to be_valid
      end
    end
  end

  context 'invalid' do
    context 'nul' do
      it 'category_name' do
        @gohan.category_name = ''
        expect(@gohan).to_not be_valid
      end
    end

    context '文字制限' do
      it '21文字以上' do
        @gohan.category_name = 'a' * 21
        expect(@gohan).to_not be_valid
      end
    end

    context '一意性' do
      it '二つ以上の ご飯 は存在しない' do
        other_gohan = Category.create(category_name: 'ご飯')
        expect(other_gohan).to_not be_valid
      end
    end
  end
end
