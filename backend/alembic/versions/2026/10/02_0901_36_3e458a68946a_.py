"""empty message

Revision ID: 3e458a68946a
Revises: 00474ee3d961
Create Date: 2026-10-02 09:01:36.065230

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3e458a68946a'
down_revision: Union[str, Sequence[str], None] = '00474ee3d961'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
