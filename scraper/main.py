from bs4 import BeautifulSoup
import time
from datetime import datetime
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# BASE_URL = os.getenv('BASE_URL')
# DEFAULT_PORT = os.getenv('DEFAULT_PORT')
# API_URL = os.getenv('API_URL')
# START_HOUR = os.getenv('START_HOUR')
# START_MINUTE = os.getenv('START_MINUTE')
# START_SECOND = os.getenv('START_SECOND
#
BASE_URL = 'https://www.pnp.co.za'
DEFAULT_PORT = 5000
API_URL = 'http://localhost:8080/'
START_HOUR = '20'
START_MINUTE = '14'
START_SECOND = '00'


def build_URL(product_string):
    return BASE_URL + '/pnpstorefront/pnp/en/search/?text={}'.format(product_string)


def scrape_pnp_item(url):
    request = requests.get(url)
    soup = BeautifulSoup(request.text, 'html.parser')

    try:
        item_name = soup.find('div', class_="item-name")
        item_price = soup.find('div', class_="currentPrice")
        print({ 'name': item_name.text, 'price': item_price.text.replace("\r\n\t\t\t", "") })
        return ({ 'name': item_name.text, 'price': item_price.text.replace("\r\n\t\t\t", "") })

    except Exception as error:
        print("An error occurred while parsing the product: {}", error)


def scrape_items(items_list):
    print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    print('------------------------------------')
    print('Scraping items...')
    product_list = []
    for i in range(len(items_list)):
        product_string = parse_item_string(items_list[i])
        product_url = build_URL(product_string)
        product_result = scrape_pnp_item(product_url)
        product_list.append({
            'name': product_result['name'],
            'price': product_result['price'],
            'url': product_url,
            'id': items_list[i]['id']
        })

    return product_list


def parse_item_string(product):
    product_string = product['name'].replace(' ', '+')
    return product_string


def create_listings(products_list):
    print('Creating listings...')
    data = requests.post('http://localhost:3000/api/listings', json={"items" : products_list}, headers={"Content-Type": "application/json"})
    time.sleep(3)
    if (data.status_code != 200):
        print('An error occurred while creating listing: {}', data)
        return
    print('Listings created successfully.')


def fetch_items():
    try:
        data = requests.get(API_URL + 'api/items')
        print('Items feched from API.')
        if (data.status_code == 200):
            return data.json()
    except Exception as error:
        print('An error occurred while fetching items: {}', error)


def schedule_running_job():
    current_hour = datetime.now().strftime("%H")
    current_minute = datetime.now().strftime("%M")
    current_second = datetime.now().strftime("%S")
    return current_hour == START_HOUR and current_minute == START_MINUTE and current_second == START_SECOND


def create_job():
    # items_list = fetch_items()
    items_list = [{
        "id": 1,
        "name" : "Bread"
    }]
    scraped_items = scrape_items(items_list)
    if not len(scraped_items) > 0:
        return
    # create_listings(scraped_items)
    print('------------------------------------')
    print('Scraper finished.')
    print('------------------------------------')
    print('items: ', scraped_items)


def run():
    print('Scraper started.')
    print('------------------------------------')
    # while True:
        # start_job = schedule_running_job()
    start_job = True
    if (start_job):
        start_job = False
        create_job()


if __name__ == '__main__':
    run()

