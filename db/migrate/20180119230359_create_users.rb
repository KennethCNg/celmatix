class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :email, null: false
      t.integer :age, null: false
      t.integer :height, null: false
      t.integer :weight
      t.string :favorite_color, null: false

      t.timestamps
    end
  end
end
