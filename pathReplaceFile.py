import os

# Задайте путь к папке, в которой нужно изменить расширения файлов
путь_к_папке = './src/content/blog/'

# Проход по всем файлам в папке
for filename in os.listdir(путь_к_папке):
    if filename.endswith('.mdx'):
        # Изменение расширения файла на .mdoc
        новое_имя = os.path.splitext(filename)[0] + '.mdoc'
        старый_путь = os.path.join(путь_к_папке, filename)
        новый_путь = os.path.join(путь_к_папке, новое_имя)

        # Переименование файла
        os.rename(старый_путь, новый_путь)

print('Расширения файлов успешно изменены на .mdoc')
