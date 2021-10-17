import mutations from '@/store/mutations'

describe('/store/mutatios', () => {
  let user, state
  beforeEach(() => {
    state = {
      users: [],
      loggedIn: { signedIn: false, user: '' },
      categories: []
    }
    user = { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' }
  });
  describe('createusers', () => {
    it('state.usersに user が追加されているか', () => {
      expect(state.users.length).toEqual(0);
      mutations.createUsers(state, user);
      expect(state.users.length).toEqual(1);
      expect(state.users).toMatchObject([
        { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' }
      ]);
    });
  });

  describe('loggedInUser(ログインしているのか？ しているとしたらユーザーは誰か?)', () => {
    it('ログインしたときの state.loggedIn の中身', () => {
      expect(state.loggedIn).toEqual( { signedIn: false, user: '' });
      mutations.loggedInUser(state, user);
      expect(state.loggedIn).toMatchObject(
        {
          signedIn: true,
          user: { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' }
        }
      )
    });

    it('ログインしていない時の state.lggedIn の中身', () => {
      expect(state.loggedIn).toEqual( { signedIn: false, user: '' });
    });
  });

  describe('logoutUser', () => {
    it('ログインしている状態からログアウトした時の state.loggedInの中身', () => {
      state.loggedIn = { signedIn: true, user: { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' } };
      mutations.logoutUser(state);
      expect(state.loggedIn).toMatchObject(
        {
          signedIn: false,
          user: ''
        }
      );
    });

    it('ログアウトしている状態からログアウトした時の state.loggedInの中身', () => {
      mutations.logoutUser(state);
      expect(state.loggedIn).toMatchObject(
        {
          signedIn: false,
          user: ''
        }
      )
    });
  });

  describe('カテゴリ (category)', () => {
    let category, categories, other_categories, update_category
    beforeEach(() => {
      category = { id: 1, category_name: 'ご飯' }
      categories = [
        { id: 1, category_name: 'ご飯' },
        { id: 2, category_name: 'おやつ' },
        { id: 3, category_name: 'しつけ' }
      ]
    });
    describe('createCategory', () => {

      it('(1つのカテゴリ追加) createCategoryを動かすと state.categoriesにカテゴリが追加されているか？', () => {
        expect(state.categories.length).toEqual(0);
        mutations.createCategory(state, category);
        expect(state.categories.length).toEqual(1);
        expect(state.categories).toMatchObject(
          [
            { id: 1, category_name: 'ご飯' }
          ]
        );
      });


    });

    describe('createAllCategories', () => {
      it('(複数のカテゴリ追加) createAllCategoriesを動かすと state.categoriesにカテゴリが追加されているか？', () => {
        expect(state.categories.length).toEqual(0);
        mutations.createAllCategories(state, categories);
        expect(state.categories).toMatchObject(
          [
            { id: 1, category_name: 'ご飯' },
            { id: 2, category_name: 'おやつ' },
            { id: 3, category_name: 'しつけ' }
          ]
        )
      });

      it('( 複数のカテゴリ ) 既にstate.categoriesに値がある時の fetchCreateAllCategories の動き', () => {
        state.categories = categories
        other_categories = [
          { id: 4, category_name: 'おもちゃ' },
          { id: 5, category_name: '散歩' },
          { id: 6, category_name: '衛生用品' }
        ]
        mutations.createAllCategories(state, other_categories);
        expect(state.categories).toMatchObject(
          [
            { id: 4, category_name: 'おもちゃ' },
            { id: 5, category_name: '散歩' },
            { id: 6, category_name: '衛生用品' }
          ]
        )
      });
    });

    describe('updateCategory', () => {
      beforeEach(() => {
        state.categories = categories
      });

      it('{id: 1, category_name: "ご飯"} を category_name: "パン" に変更', () => {
        expect(state.categories[0]).toMatchObject(
          { id: 1, category_name: 'ご飯' }
        );
        update_category = { id: 1, category_name: 'パン'}
        mutations.updateCategory(state, update_category)
        expect(state.categories[0]).toMatchObject(
          { id:1, category_name: 'パン'}
        )
      });

      it('{ id: 3, category_name: "しつけ"} を "衛生用品" に変更', () => {
        expect(state.categories[2]).toMatchObject(
          { id: 3, category_name: 'しつけ' }
        );
        update_category = { id: 3, category_name: '衛生用品'}
        mutations.updateCategory(state, update_category)
        expect(state.categories[2]).toMatchObject(
          { id:3, category_name: '衛生用品'}
        )
      });

      it('一致する id がない場合は何も変更しない', () => {
        expect(state.categories).toMatchObject([
          { id: 1, category_name: 'ご飯' },
          { id: 2, category_name: 'おやつ' },
          { id: 3, category_name: 'しつけ' }
        ]);

        update_category = {id: 4, category_name: '日用品' }
        mutations.updateCategory(state, update_category)
        expect(state.categories).toMatchObject([
          { id: 1, category_name: 'ご飯' },
          { id: 2, category_name: 'おやつ' },
          { id: 3, category_name: 'しつけ' }
        ]);
      });
    });
    describe('delete', ()=> {
      let delete_category_num
      beforeEach(() => {
        state.categories = categories
      });
      describe('allDeleteCategory', () => {
        it('state.categoriesの中身全て 削除', () => {
          expect(state.categories.length).toEqual(3);
          mutations.allDeleteCategory(state);
          expect(state.categories.length).toEqual(0);
          expect(state.categories).toMatchObject([]);
        });
      });

      describe('deleteCategory', () => {
        it('{id: 2, category_name: "おやつ"} を削除する', () => {
          delete_category_num = 2
          expect(state.categories).toMatchObject([
            { id: 1, category_name: 'ご飯' },
            { id: 2, category_name: 'おやつ' },
            { id: 3, category_name: 'しつけ' }
          ]);
          expect(state.categories.length).toEqual(3);
          mutations.deleteCategory(state, delete_category_num);
          expect(state.categories).toMatchObject([
            { id: 1, category_name: 'ご飯' },
            { id: 3, category_name: 'しつけ' }
          ])
          expect(state.categories.length).toEqual(2);
        });
        it('{id: 3, category_name: "しつけ"} を削除する', () => {
          delete_category_num = 3
          expect(state.categories).toMatchObject([
            { id: 1, category_name: 'ご飯' },
            { id: 2, category_name: 'おやつ' },
            { id: 3, category_name: 'しつけ' }
          ]);
          expect(state.categories.length).toEqual(3);
          mutations.deleteCategory(state, delete_category_num);
          expect(state.categories).toMatchObject([
            { id: 1, category_name: 'ご飯' },
            { id: 2, category_name: 'おやつ' }
          ]);
          expect(state.categories.length).toEqual(2);
        });
      });
    })

  });
});
