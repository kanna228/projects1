package Books;
import java.sql.*;
import java.util.Properties;
import java.util.Scanner;

public class Launch {

    public static void main(String[] args) {
        // РАБОТА С БАЗОЙ ДАННЫХ POSTGRESQL ЧЕРЕЗ JDBC
        Scanner input = new Scanner(System.in);
        while(true) {
            try {
                // Адрес нашей базы данных "tsn_pg_demo" на локальном компьютере (localhost)
                Class.forName("org.postgresql.Driver");
                String url = "jdbc:postgresql://localhost:5432/person";

                // Создание свойств соединения с базой данных
                Properties authorization = new Properties();
                authorization.put("user", "postgres"); // Зададим имя пользователя БД
                authorization.put("password", "ccc123r4"); // Зададим пароль доступа в БД

                // Создание соединения с базой данных
                Connection connection = DriverManager.getConnection(url, authorization);

                // Создание оператора доступа к базе данных
                Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
                        ResultSet.CONCUR_UPDATABLE);

                // Выполнение запроса к базе данных, получение набора данных
                ResultSet table = statement.executeQuery("SELECT * FROM library order by id");
                System.out.println("What do you want to do");
                System.out.println("a) Show all books");
                System.out.println("b) Delete book");
                System.out.println("c) Append a book");
                System.out.println("d) Edit book information");
                System.out.println("e) look for a book by key word");
                System.out.println("f) Quit ");

                String a = input.nextLine();


                if(a.toLowerCase().equals("a")) {
                    table.first(); // Выведем имена полей
                    for (int j = 1; j <= table.getMetaData().getColumnCount(); j++) {
                        System.out.print(table.getMetaData().getColumnName(j) + "\t\t");
                    }
                    System.out.println();

                    table.beforeFirst(); // Выведем записи таблицы
                    while (table.next()) {
                        for (int j = 1; j <= table.getMetaData().getColumnCount(); j++) {
                            System.out.print(table.getString(j) + "\t\t");
                        }

                        System.out.println();
                    }
                    if (table != null) {
                        table.close();
                    } // Закрытие набора данных
                    if (statement != null) {
                        statement.close();
                    } // Закрытие базы данных
                    if (connection != null) {

                        connection.close();
                    } // Отключение от базы данных
                }
                if(a.toLowerCase().equals("b")){
                    System.out.println("Enter the ID of the book to delete:");
                    int id = input.nextInt();
                    input.nextLine();
                    // создание запроса и дальнейшее его подключение к базе данных
                    String selectSQL = "SELECT * FROM library WHERE id = ?";
                    PreparedStatement selectStatement = connection.prepareStatement(selectSQL);
                    selectStatement.setInt(1, id);

                    // выполняем запрос и получаем результат
                    ResultSet resultSet = selectStatement.executeQuery();
                    // проверка результата на наличие такой книги с такой id
                    if (resultSet.next()) {
                        // создание запроса и дальнейшее его подключение к базе данных
                        String deleteSQL = "DELETE FROM library WHERE id = ?";
                        PreparedStatement preparedStatement = connection.prepareStatement(deleteSQL);
                        preparedStatement.setInt(1, id);

                        // выполнение запроса
                        preparedStatement.executeUpdate();
                        System.out.println("Book was deleted");
                    } else {
                        System.out.println("Book with ID " + id + " does not exist.");
                    }
                }

                if(a.toLowerCase().equals("c")){
                    System.out.println("Enter id:");
                    int id = input.nextInt();
                    input.nextLine();

                    // создание запроса и дальнейшее его подключение к базе данных
                    String selectSQL = "SELECT * FROM library WHERE id = ?";
                    PreparedStatement selectStatement = connection.prepareStatement(selectSQL);
                    selectStatement.setInt(1, id);
                    // выполняем запрос и получаем результат
                    ResultSet resultSet = selectStatement.executeQuery();

                    // проверка на то что есть ли такой id в базе данных
                    if (resultSet.next()) {
                        System.out.println("Book with ID " + id + " already exists. Choose a different ID.");
                    } else {
                        System.out.println("Enter name:");
                        String name = input.nextLine();

                        System.out.println("Enter Key words:");
                        String keywords = input.nextLine();

                        System.out.println("Enter date:");
                        int date = input.nextInt();
                        input.nextLine();

                        // создание запроса и дальнейшее его подключение к базе данных
                        String appendSql = "INSERT INTO library (id, name, keywords, date) VALUES (?, ?, ?, ?)";
                        PreparedStatement preparedStatement = connection.prepareStatement(appendSql);
                        preparedStatement.setInt(1, id);
                        preparedStatement.setString(2, name);
                        preparedStatement.setString(3, keywords);
                        preparedStatement.setInt(4, date);

                        // выполнение запроса
                        preparedStatement.executeUpdate();
                        System.out.println("Book was appended!");

                    }
                }

                if(a.toLowerCase().equals("d")){
                    System.out.println("Enter the ID of the book to edit:");
                    int id = input.nextInt();
                    input.nextLine();

                    // создание запроса и дальнейшее его подключение к базе данных
                    String selectSQL = "SELECT * FROM library WHERE id = ?";
                    PreparedStatement selectStatement = connection.prepareStatement(selectSQL);
                    selectStatement.setInt(1, id);
                    // выполняем запрос и получаем результат
                    ResultSet resultSet = selectStatement.executeQuery();

                    // проверка на то существует ли такой id что бы его редачить
                    if (resultSet.next()) {
                        System.out.println("Enter new name:");
                        String name = input.nextLine();

                        System.out.println("Enter new Keywords:");
                        String keywords = input.nextLine();

                        System.out.println("Enter new date:");
                        int date = input.nextInt();
                        input.nextLine();

                        // создание запроса и дальнейшее его подключение к базе данных
                        String updateSql = "UPDATE library SET name = ?, keywords = ?, date = ? WHERE id = ?";
                        PreparedStatement preparedStatement = connection.prepareStatement(updateSql);
                        preparedStatement.setString(1, name);
                        preparedStatement.setString(2, keywords);
                        preparedStatement.setInt(3, date);
                        preparedStatement.setInt(4, id);
                        // выполнение запроса
                        preparedStatement.executeUpdate();
                        System.out.println("Book has been updated.");
                    } else {
                        System.out.println("Book with ID " + id + " does not exist.");
                    }
                }
                if(a.toLowerCase().equals("e")){
                    System.out.println("Enter keywords:");
                    String key = input.nextLine();
                    String searchKey = "%" + key.toLowerCase() + "%";

                    // создаем запрос на выборку книг по ключевым словам
                    String selectNamesSql = "SELECT name FROM library WHERE keywords LIKE ?";

                    PreparedStatement preparedStatement = connection.prepareStatement(selectNamesSql);


                    preparedStatement.setString(1, searchKey);

                    // выполняем запрос и получаем результат
                    ResultSet resultSet = preparedStatement.executeQuery();

                    // выводим результаты
                    System.out.println("Books with keywords containing:");
                    while(resultSet.next()) {
                        String bookName = resultSet.getString("name");
                        System.out.println(bookName);
                    }

                    resultSet.close();
                    preparedStatement.close();
                }

                if(a.toLowerCase().equals("f")){
                    System.out.println("Program was stopped");
                    break;
                }


            } catch (Exception e) {
                System.err.println("Error accessing database!");
                e.printStackTrace();
            }
        }

    }
}
