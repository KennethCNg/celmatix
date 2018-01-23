class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :email, null: false
      t.string :age, null: false
      t.string :height, null: false
      t.integer :weight
      t.string :color, null: false

      t.timestamps
    end
  end
end
