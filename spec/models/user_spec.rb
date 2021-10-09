require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @tarou = User.create(last_name: '吉田', first_name: '太朗', email: 'test@test.com', password: 'password', password_confirmation: 'password')
  end

  context 'valid' do
    it '@tarou' do
      expect(@tarou).to be_valid
    end

    context '文字数' do
      it 'last_name 20文字まで' do
        @tarou.last_name = 'a' * 20
        expect(@tarou).to be_valid
      end
      it 'first_name 20文字まで' do
        @tarou.first_name = 'a' * 20
        expect(@tarou).to be_valid
      end
      it 'email 256文字まで' do
        @tarou.email = ( 'a' * 250 ) + '@a.com'
        expect(@tarou).to be_valid
      end
      it 'password 20文字まで' do
        @tarou.password = 'a' * 6
        @tarou.password_confirmation = 'a' * 6
        expect(@tarou).to be_valid
      end
    end

    context 'フォーマット' do
      context 'email' do
        it '- ハイフンがついていようが . ドットがついていようが成功' do
          @tarou.email = 'a' + '-' + '.' + '@a.com'
          expect(@tarou).to be_valid
        end
      end
    end
  end

  context 'invalid' do
    context '存在しない' do
      it 'last_name' do
        @tarou.last_name = ''
        expect(@tarou).to_not be_valid
      end
      it 'first_name' do
        @tarou.first_name = ''
        expect(@tarou).to_not be_valid
      end
      it 'email' do
        @tarou.email = ''
        expect(@tarou).to_not be_valid
      end
      it 'password' do
        @tarou.password = ' '
        @tarou.password_confirmation = 'password'
        expect(@tarou).to_not be_valid
      end
      it 'password_confirmation' do
        @tarou.password = 'password'
        @tarou.password_confirmation = ' '
        expect(@tarou).to_not be_valid
      end
    end

    context '文字制限' do
      it 'last_name 21文字以上' do
        @tarou.last_name = 'a' * 21
        expect(@tarou).to_not be_valid
      end
      it 'first_name 21文字以上' do
        @tarou.first_name = 'a' * 21
        expect(@tarou).to_not be_valid
      end
      it 'email 257文字以上' do
        @tarou.email = ( 'a' * 251 ) + '@a.com'
        expect(@tarou).to_not be_valid
      end
      it 'password 5文字以下' do
        @tarou.password = 'a' * 5
        @tarou.password_confirmation = 'a' * 5
        expect(@tarou).to_not be_valid
      end
    end

    context '一意' do
      it 'email' do
        jirou = User.create(last_name: '吉田', first_name: '二郎', email: 'test@test.com', password: 'password', password_confirmation: 'password')
        expect(jirou).to_not be_valid
      end
    end

    context 'フォーマット' do
      context 'email' do
        context '| が!#$%&()=~| がついていると invalid' do
          it '|' do
            @tarou.email = '|' + 'aaaa' + '@a.com'
            expect(@tarou).to_not be_valid
          end

          it '!#$%&()' do
            @tarou.email = '!#$%&()' + '@a.com'
            expect(@tarou).to_not be_valid
          end
        end
      end
    end
  end
end
