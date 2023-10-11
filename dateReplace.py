import re
import os

# Путь к директории с файлами, в которых нужно заменить дату
directory_path = "./src/content/blog/"

# Регулярное выражение для поиска даты в формате "гггг-мм-дд"
date_pattern = r'\d{4}-\d{2}-\d{2}'

# Функция для замены даты в файле


def replace_dates_in_file(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()

        # Ищем все даты в файле
        dates = re.findall(date_pattern, content)

        # Заменяем даты на заданный формат
        for date in dates:
            formatted_date = f'"{date}"'
            content = content.replace(date, formatted_date)

        # Сохраняем изменения в файле
        with open(file_path, 'w') as file:
            file.write(content)

        print(f'Заменено {len(dates)} дат в файле: {file_path}')

    except Exception as e:
        print(f'Ошибка при обработке файла {file_path}: {e}')


# Перебираем все файлы в директории
for root, dirs, files in os.walk(directory_path):
    for file_name in files:
        file_path = os.path.join(root, file_name)
        replace_dates_in_file(file_path)
