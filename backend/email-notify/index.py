import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

def handler(event: dict, context) -> dict:
    """
    Отправка email уведомления о регистрации игрока на SkinsFarm
    """
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }

    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            player_nick = body.get('playerNick', 'Unknown')
            player_id = body.get('playerId', 'Unknown')
            player_photo = body.get('playerPhoto', '')

            gmail_user = os.environ.get('GMAIL_USER')
            gmail_password = os.environ.get('GMAIL_APP_PASSWORD')

            if not gmail_user or not gmail_password:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Email credentials not configured'}),
                    'isBase64Encoded': False
                }

            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'Новый игрок зарегистрирован: {player_nick}'
            msg['From'] = gmail_user
            msg['To'] = 'misupova717@gmail.com'

            html_content = f'''
            <html>
                <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #9b87f5; margin-bottom: 20px;">🎮 Новый игрок на SkinsFarm!</h2>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                            <p style="margin: 10px 0;"><strong>Никнейм:</strong> {player_nick}</p>
                            <p style="margin: 10px 0;"><strong>ID:</strong> {player_id}</p>
                        </div>
                        
                        {f'<img src="{player_photo}" alt="Player Avatar" style="max-width: 150px; border-radius: 10px; margin-top: 20px;">' if player_photo else ''}
                        
                        <p style="color: #666; margin-top: 20px; font-size: 14px;">
                            Игрок успешно зарегистрировался на платформе SkinsFarm Standoff 2
                        </p>
                    </div>
                </body>
            </html>
            '''

            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)

            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(gmail_user, gmail_password)
                server.send_message(msg)

            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Email sent successfully'}),
                'isBase64Encoded': False
            }

        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }

    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
